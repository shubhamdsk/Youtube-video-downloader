import re

# Function to remove ANSI escape codes
def remove_ansi_codes(text):
    ansi_escape = re.compile(r'\x1b\[[0-9;]*[mK]')
    return ansi_escape.sub('', text)
