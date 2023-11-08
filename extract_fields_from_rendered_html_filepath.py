#!/usr/bin/env python3
"""
Author : Xinyuan Chen <45612704+tddschn@users.noreply.github.com>
Date   : 2023-11-08
Purpose: Extract fields from rendered html path(s)
"""

import argparse
import json
from pathlib import Path
from utils import extract_fields_from_rendered_html_filename


def get_args():
    """Get command-line arguments"""

    parser = argparse.ArgumentParser(
        description="Extract fields from rendered html path(s)",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )

    # arg to accept 1+ paths
    parser.add_argument(
        "path",
        metavar="path",
        nargs="+",
        type=Path,
        help="Path(s) to rendered html file(s)",
    )

    return parser.parse_args()


def main():
    """Make a jazz noise here"""

    args = get_args()
    l = []  # noqa
    for p in args.path:
        d = {
            "filename": p.name,
            "path": str(p),
            **extract_fields_from_rendered_html_filename(p.name),  # type: ignore
        }
        l.append(d)
    print(json.dumps(l, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
