#!/usr/bin/env python3
"""
Author : Xinyuan Chen <45612704+tddschn@users.noreply.github.com>
Date   : 2023-11-07
Purpose: Convert screenshots to specified geometry
"""

import argparse
import subprocess
from pathlib import Path
from shlex import quote


def get_args():
    """Get command-line arguments"""

    parser = argparse.ArgumentParser(
        description='Convert screenshots to specified geometry',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)

    parser.add_argument('-d', '--distort',
                        action='store_true',
                        help='Distort images to exactly fit the target resolution')

    return parser.parse_args()


def main():
    """Make a jazz noise here"""

    args = get_args()

    # Define the directory and target resolution
    directory = Path('screenshots')
    target_resolution = '1280x800'

    # Verify if the directory exists
    if not directory.is_dir():
        print(f"The directory {directory} does not exist.")
        return

    # List all files in the screenshots directory
    for file_path in directory.glob('*.png'):
        # Skip files that already have the target resolution in their name
        if file_path.stem.endswith(f'-{target_resolution}'):
            continue

        # Generate the new filename with the target resolution
        new_file_name = f"{file_path.stem}-{target_resolution}{file_path.suffix}"
        new_file_path = directory / new_file_name

        # Construct the convert command with or without distortion
        resize_option = f"{target_resolution}!" if args.distort else target_resolution
        command = f"convert -resize {resize_option} {quote(str(file_path))} {quote(str(new_file_path))}"

        # Execute the command
        try:
            subprocess.run(command, check=True, shell=True)
            print(f"Converted {file_path} to {new_file_path}")
        except subprocess.CalledProcessError as e:
            print(f"Error converting {file_path}: {e}")


if __name__ == '__main__':
    main()
