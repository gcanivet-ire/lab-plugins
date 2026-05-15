#!/usr/bin/env python3
"""
Download all transcript files from Google Drive.

Dependencies:
    pip install gdown google-api-python-client google-auth

Usage:
    # Public folder (no credentials needed):
    python scripts/download_transcripts.py

    # Private folder (set credentials first):
    export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
    python scripts/download_transcripts.py
"""

import os
import sys

FOLDER_ID = "1RuTDv4hIajCa4wtXy73sj0IErhhB-RIV"
FOLDER_URL = f"https://drive.google.com/drive/folders/{FOLDER_ID}"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "transcripts")

TRANSCRIPT_EXTENSIONS = {".txt", ".vtt", ".srt", ".docx", ".pdf", ".doc"}


def download_with_gdown():
    try:
        import gdown
    except ImportError:
        print("gdown not installed. Run: pip install gdown", file=sys.stderr)
        return False

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    try:
        gdown.download_folder(FOLDER_URL, output=OUTPUT_DIR, quiet=False, use_cookies=False)
        return True
    except Exception as e:
        print(f"gdown failed: {e}", file=sys.stderr)
        return False


def download_with_drive_api():
    creds_file = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not creds_file:
        print(
            "Set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON file "
            "or OAuth credentials for private folder access.",
            file=sys.stderr,
        )
        return False

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
        from googleapiclient.http import MediaIoBaseDownload
        import io
    except ImportError:
        print(
            "google-api-python-client not installed. "
            "Run: pip install google-api-python-client google-auth",
            file=sys.stderr,
        )
        return False

    scopes = ["https://www.googleapis.com/auth/drive.readonly"]
    creds = service_account.Credentials.from_service_account_file(creds_file, scopes=scopes)
    service = build("drive", "v3", credentials=creds)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    downloaded = []
    page_token = None

    while True:
        query = f"'{FOLDER_ID}' in parents and trashed=false"
        response = (
            service.files()
            .list(
                q=query,
                spaces="drive",
                fields="nextPageToken, files(id, name, mimeType)",
                pageToken=page_token,
            )
            .execute()
        )

        for file in response.get("files", []):
            name = file["name"]
            ext = os.path.splitext(name)[1].lower()
            if ext not in TRANSCRIPT_EXTENSIONS:
                continue

            dest = os.path.join(OUTPUT_DIR, name)
            request = service.files().get_media(fileId=file["id"])
            with io.FileIO(dest, "wb") as fh:
                downloader = MediaIoBaseDownload(fh, request)
                done = False
                while not done:
                    _, done = downloader.next_chunk()
            print(f"  Downloaded: {name}")
            downloaded.append(name)

        page_token = response.get("nextPageToken")
        if not page_token:
            break

    print(f"\n{len(downloaded)} file(s) saved to {os.path.abspath(OUTPUT_DIR)}/")
    return True


def main():
    print(f"Downloading transcripts from Google Drive folder: {FOLDER_ID}")
    print(f"Output directory: {os.path.abspath(OUTPUT_DIR)}\n")

    # Try gdown first (works for public/shared folders without OAuth setup)
    if download_with_gdown():
        _report()
        return

    # Fall back to Drive API with credentials
    print("Falling back to Google Drive API (requires GOOGLE_APPLICATION_CREDENTIALS)...\n")
    if not download_with_drive_api():
        print(
            "\nCould not download files. Options:\n"
            "  1. Make the folder publicly accessible and retry.\n"
            "  2. Set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON file.\n"
            "  3. Run: pip install gdown  then retry.",
            file=sys.stderr,
        )
        sys.exit(1)


def _report():
    if not os.path.isdir(OUTPUT_DIR):
        return
    files = [
        f for f in os.listdir(OUTPUT_DIR)
        if os.path.splitext(f)[1].lower() in TRANSCRIPT_EXTENSIONS
    ]
    print(f"\n{len(files)} transcript file(s) saved to {os.path.abspath(OUTPUT_DIR)}/")
    for f in sorted(files):
        print(f"  {f}")


if __name__ == "__main__":
    main()
