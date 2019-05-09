# GIT常用命令

<a name="df368884"></a>
## 前言
这里列举常见场景，并给出相应解决方案

约定： 下文代码块中`${}`里面表示的是变量，具体值视情况而定，其余的都是正确可执行的命令。

<a name="224e2ccd"></a>
## 配置

Mac/Linux 用户 执行以下操作
```bash
vi ~/.gitconfig
```

Windows用户在桌面用户文件夹下有个.gitconfig隐藏文件，直接修改即可

![](https://cdn.nlark.com/yuque/0/2019/png/210664/1547175144703-dfccb8e7-55f7-4be0-a030-2c5ff2bdc1c5.png#align=left&display=inline&height=565&originHeight=805&originWidth=1179&status=done&width=827)

补充以下内容
```bash
[alias]
  st = status
  cm = commit
  br = branch
  co = checkout
  ps = push
```

<a name="9a5e2729"></a>
## 增强
Mac或Linux用户，推荐安装[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，增强命令行体验。

<a name="6ab35d2e"></a>
## 本地提交

<a name="d97f7891"></a>
### 取消未暂存的修改
```bash
# 恢复单个文件
git checkout -- ${file}

# 恢复目录下所有文件
git checkout -- .
```

<a name="a60874a3"></a>
### 取消add
```bash
git reset HEAD
```

<a name="a00ef3da"></a>
### 取消提交

```bash
git reset HEAD^1
```

或者

```
# 查看提交的hash
git log
# 使用相应的hash回滚
git reset ${hash}
```

<a name="01ce5b76"></a>
### 修正提交

适用于提交信息有误或有遗漏，需要修正最新提交信息的场景。
```bash
git commit --amend
```

<a name="07e8a7ea"></a>
### stash修改

适用于当前功能开发并不完整，不能产生一次提交，但却要开发另外功能的场景
```bash
git stash save '${msg}'
```

<a name="f2210fdc"></a>
### 恢复stash
```bash
git stash pop
```

<a name="5aa52869"></a>
## 分支管理

<a name="16103ed6"></a>
### 创建分支
```bash
git checkout -b ${branch}
```

<a name="5ae8ad56"></a>
### 查看远程分支
```bash
git branch --remote

# 或者
git branch -r
```

<a name="f0dfd0dd"></a>
### 根据远程分支创建分支
```bash
# 保证分支信息拉取下来
git pull
# 查看远程分支信息
git branch -r
# 创建会追踪远程分支的本地分支
git checkout -t origin/${branch}
```

注意上面的完整命令为
```bash
git checkout -b ${local_branch} -t origin/${branch}
```

可以省略 `-b ${local_branch}`

<a name="372eda64"></a>
### 创建干净历史分支
```bash
git checkout --orphan ${branch}
```


<a name="06649fb5"></a>
### 删除分支
```bash
# 删除本地分支
git branch -d ${local_branch}

# 删除远程分支
git push origin -d ${remote_branch}
# 或
git push origin :${remote_branch}
```

<a name="2ec512a4"></a>
## 标签管理

<a name="1d468ba5"></a>
### 新建本地标签
```bash
git tag ${tag_name}
```

<a name="30568ea1"></a>
### 删除本地标签
```bash
git tag -d ${tag_name}
```

<a name="33a93a70"></a>
### 查看本地所有标签
```bash
git tag -l
```

<a name="24a634bd"></a>
### 推送本地标签
```bash
git push origin ${tag_name}

# 推送所有标签
git push origin --tags
```

<a name="8f223397"></a>
### 获取远程标签
```bash
git fetch origin tag
```

<a name="3d9471e5"></a>
### 删除远程标签
```bash
git push origin -d tag ${tag_name}
```

<a name="44a6ae3f"></a>
## 远程仓库

<a name="a410e2c9"></a>
### 浅克隆

适用于仓库很大，对过往历史不关心，想快速克隆的场景。
```bash
git clone --depth=1 ${repo_url}
```

<a name="dd01a6fc"></a>
### 强行推送

适用于本地开发了一段时间，最近才在代码托管平台上初始化远程仓库的场景
```bash
# 谨慎：本地master分支会覆盖远程master分支！
git push --force
```

<a name="96680894"></a>
### 取消错误的推送

适用于推送了错误的提交后, 想取消该推送的场景
```bash
# 更新代码
# 一定要更新最新的代码! 以免覆盖掉其他协作者的推送!
git pull

# 查看提交的hash
git log

# 使用相应的hash回滚
# 注意: 回滚后 在${hash}之后提交的代码 都会在 Changes to be committed 中
git reset ${hash}

# 覆盖远程仓库的代码
git push --force
```

<a name="dfac151d"></a>
## 高级
<a name="cherry-pick"></a>
### cherry-pick

1.checkout目标分支(target branch)

2.在源分支(source  branch)获取revision number<br />![](https://cdn.nlark.com/yuque/0/2018/png/160590/1542699698608-3b2be42b-2148-4355-a76e-dc259172faeb.png#align=left&display=inline&height=261&originHeight=724&originWidth=2076&status=done&width=747)<br />3.开始cherry-pick

输入命令

```bash
git cherry-pick df2612cf167ebaf5e743042477942b95bf15f33d b910c946f8d3dedbb33c2478fceda53867e77000 0737f6f4eb35cf79a3d775f7e05f39a2e1bd65d9 f99c68db44102f28a2a3652103ad94733092c788 9c5cba2ac3ba9b9870d57ac8a59d83333b6a3623 2659bfeae32bd3ca6a574669359248e631e750fd 4d7fa72438d20d1c5917dc9b234d90ea791fd7c5
```

4.解决冲突

如果遇到冲突，会提示，解决冲突后

```bash
git add ${冲突的文件}
```

5.继续cherry-pick

之后会提示，继续操作

```bash
git cherry-pick --continue
```

如再遇到冲突，重复4，5

6.结束

<a name="d2c983fc"></a>
### merge unrelated histories
可以使用 --allow-unrelated-histories

```bash
git merge --allow-unrelated-histories
```

```bash
git pull origin ${branch} --allow-unrelated-histories
```

<a name="81712500"></a>
### 根据文件搜索历史
```bash
git log --all --full-history -- package-lock.json
```

<a name="d55a9095"></a>
### 从所有提交中删除一个文件
```bash
git filter-branch --tree-filter "rm -rf package-lock.json" --prune-empty -- --all
```

如果代码已经推送到了远程仓库，还需要强制推送

```bash
git push -f
```

<a name="0d98c747"></a>
## 其他

<a name="95227478"></a>
### 记住账号密码
```sh
# 输入下列命令后，再输入一次账号密码即可
git config --global credential.helper store
```

