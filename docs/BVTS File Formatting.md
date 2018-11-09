# BetterVRV Timestamp (`.bvts`) file formatting:

The files are plaintext.

The filename should be simply the 9 character, alphanumeric ID VRV uses for each individual piece of content.

The first line should be the (mostly) human-readable name for the content that follows the ID in the url, preceded with `# `. Any lines beginning with `#` are comments.

The second line should be empty, containing only a return.

The following lines will all be annotations


OPTIONS:

1a:
    LABEL HH:MM:SS.XX,FFF --> HH:MM:SS.XX,FFF

1b:
    LABEL_START HH:MM:SS.XX,FFF
    LABEL_END HH:MM:SS.XX,FFF

2a:
    HH:MM:SS.XX,FFF --> HH:MM:SS.XX,FFF
    LABEL

2b:
    HH:MM:SS.XX,FFF
    LABEL_START

    HH:MM:SS.XX,FFF
    LABEL_END

3:
    LABEL: {
        START: HH:MM:SS.XX,FFF,
        END: HH:MM:SS.XX,FFF
    }
