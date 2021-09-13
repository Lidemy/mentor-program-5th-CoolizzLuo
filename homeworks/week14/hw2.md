# Linode 架設攻略

## 環境
1. 系統: `Ubuntu 20.04 LTS`
2. 主機商: `Linode`
3. 選用方案: `Nanode 1GB` $5/Monthly 1GB-RAM 1-CPUS 25GB-Storage

## 前言
網路上大部分都有安裝過程，差異其實不大，都是不同版本的 Ubuntu 而有些許的差異，所以過程快速帶過，我著重的方向在於安全性的設置

## 安裝 lamp
1. 更新 `ubuntu`
    * `sudo apt update && sudo apt upgrade`
2. 安裝 `Tasksel` (一款可以讓我們快速安裝 dns server、lamp，等等應用的軟體包)
    * `sudo apt install tasksel`
3. 用 Tasksel 下載 lamp-server [(什麼是 lamp)](https://magiclen.org/lamp/)
    * `sudo tasksel install lamp-server`


## 安裝 phpmyadmin
1. 下載 phpmyadmin
    * `sudo apt install phpmyadmin`

2. 改變 phpmyadmin 登入的設定，改成可以用密碼登入
    * `sudo mysql -u root mysql`
    * `UPDATE user SET plugin='mysql_native_password' WHERE User='root';`
    * `FLUSH PRIVILEGES;`
    * `exit`

3. 設定 sql root 的密碼
    * `sudo mysql_secure_installation`

4. /phpmyadmin 看到登入畫面
    * 如果沒有請檢查 /var/www/html 如果沒有 /phpmyadmin，做以下步驟，在底下建立 phpmyadmin 的軟連結
    * `cd /var/www/html`
    * `ln -s /usr/share/phpmyadmin`

### 一些問題
1. mySQL 安全權限設定
`sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf`
進入 Vim 編輯器將 bind-address = 127.0.0.1 那行的最前面加上 # 或 將 127.0.0.1 改成 0.0.0.0
`sudo service mysql restart`
2. mySQL 使用者權限
上次使用 `sudo mysql_secure_installation` 之後需要登入才能改變 mySQL 權限設定
`mysql -u root -p` 用 root mySQL 使用者登入 mySQL
`SELECT user,authentication_string,plugin,host FROM mysql.user` 查看 mySQL 有那些使用者帳號
`GRANT ALL PRIVILEGES ON *.* TO 'mySQL 使用者帳號'@'%' IDENTIFIED BY 'mySQL 使用者密碼';` 選擇你想要遠端連接的使用者帳號，更改 host 欄位中的 localhost 為 %

## 安全性設定
### 1. 關閉 Auto Index
> 如果文件中沒有 index 標題的檔案，會直接出現你的根目錄，要把這個功能關掉

如果有關閉 Auto Index 當用戶剛好打的網址為檔案資料夾位置，則會出現類似乎檔案索引的頁面，如果沒有關閉很容易就讓人看到你伺服器的檔案目錄結構
* 關閉前
![](https://i.imgur.com/Ikpo6rb.png)
* 關閉後
![](https://i.imgur.com/qm26bAp.png)

### 2. 限制登入網段 (啟動防火牆/白名單)
防火牆又有分`主機商本身提供的防火牆`及`主機本身的防火牆`只有介面的不同，觀念上都是一樣的，使用主機商的防火牆是從Web介面設定(~~這樣就不怕改錯防火牆，進不去主機的窘境了~~)，主機上則又有幾款不同的防火牆擇一即可

我這邊還是使用 Ubuntu 的 ufw 防火牆 (因為自己有實體的小主機，所以讓自己習慣設定主機上的)
主要只開放 (HTTP 80)、(HTTPS 443)，(MYSQL 3306)視情況開啟，如果透過 phpMyAdmin 操作資料庫就不用開啟，(SSH 22)我只在開放給我允許的 IP，但如果家裡是浮動 IP 就要小心 IP 的變動，如果限制 IP 就會推薦從主機傷的防火牆設置。


1. 狀態查詢，預設為閒置 (inactive)。
`$ sudo ufw status`

2. 啟動 UFW 服務 (enable)。 (這邊要注意如果先開啟全部阻擋，如果此時斷開 ssh 後會連不回來)
`$ sudo ufw default deny`

3. 預設 (default) 全部阻擋 (deny)，先全部阻擋在開啟允許的比較方便快速。
`$ sudo ufw default deny`

4. 允許 (allow) 所有的 ssh 連線。
`$ sudo ufw allow ssh`

5. 如要限制 ssh 的 IP，通常 IP 會開一個 c-class，利用斜線 /24 來表示整個網段 [(了解 CIDR)](https://zh.wikipedia.org/wiki/%E6%97%A0%E7%B1%BB%E5%88%AB%E5%9F%9F%E9%97%B4%E8%B7%AF%E7%94%B1)
`$ sudo ufw allow from 211.x.x.0/24 to anyport 22`

6. 其他 port 的設置方式一樣，設定完後可以看一下狀態
```
$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
Anywhere                   ALLOW       203.ｘ.ｘ.0/24
22                         ALLOW       211.x.x.0/24
3306                       ALLOW       211.ｘ.x.0/24

```
這樣就表示 80, 443 任意 IP 都可以連線 (可以正常開啟 apache 網頁)，而對 203.x.x.0/24 的 port 全部都開放，對於 211.x.x.0/24 這個網段只開放 22, 3306 port，對樣的設定觀念也可以套用在任一防火牆上

#### 備註
真的不知道各服務對應的 port 可以上網查找或是到主機底下的 `/etc/services` 查看


### 3. 禁止 root 管理者以 SSH 登入
會禁止 root 的原因有幾個：
1. `root` 這個帳號名稱是眾所皆知的，在帳號已知的情況下，只要破解密碼即可登入了，如此一來很容易遭受暴力法嘗試破解。
2. 無法追蹤與稽核相關修改與操作，因為在系統記錄上都是 root。

如果真有需要進行 `root` 的操作，最好的方法還是先使用其他帳號登入後，再以 `sudo` 等方式切換成 `root` 進行管理，此作法能多一道防線，也能對哪些帳號可以具備 `sudo` 權限進行管理。

#### *新增使用者*
> 在 Linode 上剛裝好的 Ubuntu Linux 是直接用 root 登入的，沒有一般使用者帳號，但如果所有的動作都使用 root 來操作，會給系統帶來很大的風險，通常我們都會一般帳號來登入，必要時才切換成 root 權限，以避免下錯指令等意外發生。

1. `adduser myuser` 新增一名使用者
2. `usermod -a -G sudo myuser` 將 `myuser` 這個使用者加入 sudo 群組
3. `ssh myuser@12.34.56.78` 這樣設定好之後，在用這個帳號以 SSH 登入
4. `sudo su` 測試看看是否能 `sudo`
5. 如果能取得 `root` 權限就表示沒問題了。

#### *停用 root 登入*
> 編輯 /etc/ssh/sshd_config，將密碼登入功能關閉
1. `PermitRootLogin no` 停用 `root` 登入
2. `PasswordAuthentication no` 如果使用金鑰都入也可以把密碼登入的功能給關閉
3. `sudo service ssh restart` 重新啟動 SSH 伺服器，在測試 root 登入
4. 在 Linode 上可以在他們的網站介面 reset root password

### 4. SSH 金鑰認證登入
> SSH 公開金鑰認證可以大幅增加伺服器的安全性，我們可以使用 ssh-keygen 在自己的電腦中產生金鑰後，再將公鑰放進伺服器中

1. 在本機端產生金鑰
```
ssh-keygen
scp ~/.ssh/id_rsa.pub myuser@12.34.56.78:
```

2. 接著再到伺服器上，建立 .ssh 目錄，把公鑰放置在 `.ssh/authorized_keys`
```
mkdir .ssh
mv id_rsa.pub .ssh/authorized_keys
```

3. 設定檔案權限
```
chown -R myuser:myuser .ssh
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
```

4. 設定好之後，測試 myuser 是否可以不需要密碼登入 SSH。


## 參考資料

[安裝 LAMP Server + phpMyAdmin 在 Linux 系統上輕鬆架設網站](https://magiclen.org/lamp/)
[在Ubuntu 20.04 安裝Apche+mysql+php+phpmyadmin](http://programmer.hsinchi.info/1994)
[UFW基本指令](https://kirby86a.pixnet.net/blog/post/94339388)
[簡易的防火牆 - UFW & GUFW](https://chusiang.gitbooks.io/working-on-gnu-linux/content/07.ufw.html)
[Ubuntu Server 20.04.1 預設 UFW 防火牆 Firewall 設定規則詳解和教學](https://www.footmark.info/linux/ubuntu/ubuntu-server-ufw/)
[ubuntu 如何關閉 root 或特定使用者遠端 ssh 登入](https://blog.camel2243.com/2016/02/29/ubuntu-%E5%A6%82%E4%BD%95%E9%97%9C%E9%96%89-root-%E6%88%96%E7%89%B9%E5%AE%9A%E4%BD%BF%E7%94%A8%E8%80%85%E9%81%A0%E7%AB%AF-ssh-%E7%99%BB%E5%85%A5/)
[限制 Linux 的 SSH 連線設定](https://cynthiachuang.github.io/Linux_SSH_Access_Control/)
[Linode VPS 安裝 Ubuntu Linux 與基本安全性設定](https://blog.gtwang.org/web-hosting/linode-vps-ubuntu-linux-setup-for-security/2/)
[Linode（Getting Started with Linode](https://www.linode.com/docs/guides/getting-started/)
[Linode（Securing Your Server）](https://www.linode.com/docs/guides/securing-your-server/)
[SSH 公開金鑰認證：不用打密碼登入 Linux 設定教學，安全又方便](https://blog.gtwang.org/linux/linux-ssh-public-key-authentication/)
[設定 Linux 使用 SSH Key-based 登入驗證方式](https://cynthiachuang.github.io/Configuring-SSH-Key-Based-Authentication-on-a-Linux/)