 taskkill //F //PID $(netstat -aon | grep 3000 | grep -oE '[^ ]+$' | head -n 1)
 taskkill //F //PID $(netstat -aon | grep 1776 | grep -oE '[^ ]+$' | head -n 1)
 yarn dev