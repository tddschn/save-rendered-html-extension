import re, base64
from datetime import datetime


def extract_fields_from_rendered_html_filename(filename: str) -> dict | None:
    # Regex pattern to extract the parts from the filename
    pattern = r"rendered_html_([^_]+)_(.+)__([^.]+)\.html"
    match = re.match(pattern, filename)

    if not match:
        return None

    timestamp_str, title, encoded_url = match.groups()

    # Convert the timestamp to a Unix timestamp (integer)
    timestamp_dt = datetime.strptime(timestamp_str, "%Y-%m-%dT%H-%M-%S-%fZ")
    timestamp_unix = int(timestamp_dt.timestamp())

    # Decode the Base64 encoded URL
    is_url_truncated = False
    try:
        url = base64.b64decode(encoded_url).decode("ascii")
    except:
        is_url_truncated = True
        try:
            url = base64.b64decode(encoded_url + "=" * (-len(encoded_url) % 4)).decode(
                "ascii"
            )
        # url = base64.urlsafe_b64decode(encoded_url).decode('ascii')
        except:
            lens = len(encoded_url)
            # cSpell:disable
            lenx = lens - (lens % 4 if lens % 4 else 4)
            url = base64.b64decode(encoded_url[:lenx]).decode("ascii")
            # cSpell:enable

    return {
        "timestamp": timestamp_unix,
        "title": title,
        "url": url,
        "is_url_truncated": is_url_truncated,
    }
