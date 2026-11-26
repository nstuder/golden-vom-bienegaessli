#!/bin/bash
# Deletes old backups created by backup.sh and keeps the newest ones of each kind.
# Runs on the server after every deploy (see deploy-playbook.yml).
#
#   BACKUP_DIR  directory with the backups (default: ~/backups/bienegaessli)
#   KEEP        number of backups to keep per kind (default: 2)
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-$HOME/backups/bienegaessli}"
KEEP="${KEEP:-2}"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "No backup directory at $BACKUP_DIR, nothing to clean up"
  exit 0
fi

# Only files with the exact naming of backup.sh are touched. The names contain a
# timestamp (YYYYMMDD_HHMMSS), so sorting them by name sorts them by age.
for pattern in \
  '^mongo_dump_[0-9]{8}_[0-9]{6}\.archive\.gz$' \
  '^images_backup_[0-9]{8}_[0-9]{6}\.tar\.gz$'; do
  ls -1 "$BACKUP_DIR" | grep -E "$pattern" | sort -r | tail -n +"$((KEEP + 1))" | while read -r file; do
    echo "Deleting old backup $file"
    rm -f -- "$BACKUP_DIR/$file"
  done
done
