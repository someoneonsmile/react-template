# set shell := ['bash', '-c']
# set export == set export := true
# set positional-arguments

# just c == just check
alias c := check

# `just` 被调用而没有传入任何配方时，会运行第一个配方
default:
	# `@` 静默运行不打印运行的命令, 在配方前的 `@`: 反转每一行的 `@` 含义
	@just --list
	# 命令前加 `-`: 表示失败仍继续运行

# 以 `_` 开头的配方和别名为私有，将在 `just --list` 中被忽略
dev:
	pnpm run dev

check:
	pnpm run check

build:
	pnpm run build-local

deploy: build
	# 每一行都是新 Shell 运行, 可通过转义换行符，或者 Shebang 方式运行
	# Shebang 默认以静默方式运行
	# 可在 shell 脚本中设置 `set -x`, 打印每一行脚本
	# set -euxo pipefail
	# #!/usr/bin/env bash
	sudo rm -rf /usr/share/nginx/poetry/* && \
	sudo cp -r dist/* /usr/share/nginx/poetry && \
	sudo systemctl restart nginx
