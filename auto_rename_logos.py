import os
import glob
import re
import mysql.connector
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
from thefuzz import process

# IMPORTANT:
# Set your tesseract executable path correctly below if it's installed.
# Default locations:
# C:\Program Files\Tesseract-OCR\tesseract.exe
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

ASSETS_DIR = r"C:\codingVibes\landingPages\PersonalPortfolio\anugerah_BE\assets"
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "", # Assuming XAMPP default
    "database": "asb_portfolio"
}

def get_db_brands():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, name FROM brands")
    brands = cursor.fetchall()
    conn.close()
    return {b['name'].upper(): b['name'] for b in brands}

def get_image_paths(base_dir):
    extensions = ('*.png', '*.jpg', '*.jpeg', '*.webp')
    files = []
    for ext in extensions:
        files.extend(glob.glob(os.path.join(base_dir, '**', ext), recursive=True))
    return files

def preprocess_image(img_path):
    # Preprocess image to enhance OCR text readability
    try:
        img = Image.open(img_path)
        img = img.convert('L') # grayscale
        img = img.filter(ImageFilter.MedianFilter())
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2)
        return img
    except Exception as e:
        print(f"  [X] Failed opening {img_path}: {e}")
        return None

def extract_text_ocr(img_path):
    try:
        img = preprocess_image(img_path)
        if not img: return ""
        # configuration to assume a single raw block of text (often best for logos)
        text = pytesseract.image_to_string(img, config='--psm 11')
        return text.strip().upper()
    except Exception as e:
        # Tesseract not found or error
        return ""

def extract_filename_words(filename):
    # fallback to scrape the file name itself (e.g. 1280px-Allen-Bradley_logo.png -> ALLEN BRADLEY LOGO)
    name_no_ext, _ = os.path.splitext(filename)
    return ' '.join(re.split(r'[-_]', name_no_ext)).upper()

def main():
    print("🚀 [1/2] Connecting to Database...")
    brand_dict = get_db_brands()
    brand_names_upper = list(brand_dict.keys())
    print(f"   Done. Loaded {len(brand_names_upper)} brands.")

    print("\n📦 [2/2] Scanning assets directory...")
    image_paths = get_image_paths(ASSETS_DIR)

    for filepath in image_paths:
        filename = os.path.basename(filepath)
        dir_path = os.path.dirname(filepath)
        name_no_ext, _ = os.path.splitext(filename)
        # get strictly the last extension (so .svg.png => .png)
        ext = '.' + filename.split('.')[-1]
        
        # Skip files already flawlessly matched
        if name_no_ext.upper() in brand_names_upper:
            target_name = f"{name_no_ext.upper()}{ext}"
            if filename != target_name:
                os.rename(filepath, os.path.join(dir_path, target_name))
                print(f" ✨ Auto-Fixed Exact Case: {target_name}")
            continue

        print(f"\n 👀 Analyzing: {filename}...")
        
        # 1. OCR Attempt
        detected_text = extract_text_ocr(filepath)
        
        # 2. Filename Fallback if OCR fails or gives garbage
        if not detected_text or len(detected_text) < 3:
            detected_text = extract_filename_words(filename)
            
        print(f" 🧠 Detected Features: '{detected_text.strip()}'")

        # Process fuzzy matching
        best_match, score = process.extractOne(detected_text, brand_names_upper)
        
        # Wait, if we use just generic filename like 'Desain tanpa judul', fuzzy match might grab random string
        # Limit confidence check strictly
        if score > 75 and best_match not in "DESAIN TANPA JUDUL":
            new_filename = f"{best_match}{ext}"
            new_filepath = os.path.join(dir_path, new_filename)
            
            # Double check it doesn't collide
            if not os.path.exists(new_filepath) and new_filepath.lower() != filepath.lower():
                os.rename(filepath, new_filepath)
                print(f" ✅ RENAMED (Score {score}%): {filename} -> {new_filename}")
            elif new_filepath.lower() == filepath.lower() and new_filepath != filepath:
                # Case fix
                os.rename(filepath, new_filepath + ".tmp")
                os.rename(new_filepath + ".tmp", new_filepath)
                print(f" ✅ FIX CASE: {filename} -> {new_filename}")
            else:
                print(f" ℹ️ Exists '{new_filename}'. Skipped.")
        else:
            print(f" ❌ Confidence too low ({score}%) for '{detected_text}'. Manual check required.")

    print("\n🎉 OCR Pipeline Execution Finished!")

if __name__ == "__main__":
    main()
