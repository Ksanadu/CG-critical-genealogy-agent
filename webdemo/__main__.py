"""Allow `python -m webdemo` without the runpy twin-import warning."""

from webdemo.server import main

if __name__ == "__main__":
    raise SystemExit(main())
