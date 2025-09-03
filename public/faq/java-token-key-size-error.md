<Title>运行生成 Token 的 Java 源码时，如果出现 “java.security.InvalidKeyException:illegal Key Size” 异常提示，该如何处理？</Title>



---

可选择如下任一方法处理：

1. 将 Java 升级为 8u162 或以上版本，即可默认使用 ulimited policy，若升级到 Java 9及以上版本，则无相关限制；
2. 若您的 Java 版本为 8u151 或 8u152，请在您的程序直接设置无限制权限策略；   

    ```java
    Security.setProperty("crypto.policy", "unlimited");
    ```

3. 若您的 Java 为其他版本，请在官方网站下载 JCE 无限制权限策略文件，并使用其中的文件覆盖 $JAVA_HOME/lib/security目录下的对应的 jar：
	- 如果您安装的是 JDK7，请访问  [Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files 7](http://www.oracle.com/technetwork/java/javase/downloads/jce-7-download-432124.html) 下载该文件。
    - 如果您安装的是 JDK8，请访问  [Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files 8](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) 下载该文件。