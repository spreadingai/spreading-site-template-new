# 导入资源和模型

- - -

本文档将为您介绍，如何导入 ZegoEffects SDK 内部提供的 AI 资源与模型。

## 实现流程

<Steps>
<Step title="获取资源和模型">
在使用 ZegoEffects SDK 提供的 AI 功能前，请在 [下载](/ai-effects-android-java/downloads) 页面的 SDK 内部，获取最新版本的 AI 资源与模型（后缀为 bundle 或 model 的文件），并将其拷贝到您的工程中，以在后续步骤中使用。
<Note title="说明">
如果需要使用美颜，美型、美白、牙齿美白、红润、大眼、瘦脸、人像分割等功能，请先导入 SDK 包内对应的资源与模型。
</Note>
</Step>
<Step title="指定路径">
指定 AI 资源和模型的绝对路径。
```java
// 传入模型和资源的绝对路径。美颜，美型，美白，牙齿美白，红润，大眼、瘦脸、人像分割功能须导入资源及模型。
ArrayList<String> aiResourcesInfos = new ArrayList<>();
aiResourcesInfos.add("sdcard/xxx/xxxxx/CommonResources.bundle");
aiResourcesInfos.add("sdcard/xxx/xxxxx/FaceWhiteningResources.bundle");

// 仅 2.0.0 之前版本支持挂件贴纸资源
// aiResourcesInfos.add("sdcard/xxx/xxxxx/PendantResources.bundle");

aiResourcesInfos.add("sdcard/xxx/xxxxx/RosyResources.bundle");
aiResourcesInfos.add("sdcard/xxx/xxxxx/TeethWhiteningResources.bundle");
// 滤镜资源
aiResourcesInfos.add("sdcard/xxx/xxxxx/ColorfulStyleResources");
// 美妆资源
aiResourcesInfos.add("sdcard/xxx/xxxxx/MakeupResources");   
// 清晰功能(只支持 2.0.0 及以后版本)
aiResourcesInfos.add("sdcard/xxx/xxxxx/ClarityResources.bundle");
// 设置 AI 模型
aiResourcesInfos.add("sdcard/xxx/xxxxx/FaceDetectionModel.model");
aiResourcesInfos.add("sdcard/xxx/xxxxx/Segmentation.model");
// 调整肤色资源 (只支持 2.0.0 及以后版本, 美黑、麦色、冷白、暖白、粉白)
// SkinColorResources/*.bundle
aiResourcesInfos.add("sdcard/xxx/xxxxx/SkinColorResources");
```
</Step>
<Step title="拷贝资源到手机目录下">
拷贝资源到手机目录下。

```java
/**
 * 从 assets 目录中复制整个文件夹内容,拷贝到 /data/data/包名/files/目录中
 *
 * @param activity activity 使用 CopyFiles 类的 Activity
 * @param filePath String  文件路径,如：/assets/aa
 */
public static void copyAssetsDir2Phone(Context activity, String filePath, String destPath) {
    try {
        String[] fileList = activity.getAssets().list(filePath);
        if (fileList.length > 0) {
            File file = new File(activity.getFilesDir().getAbsolutePath() + File.separator + destPath + File.separator + filePath);
            if (file.exists()) {
                //TODO: 这里做删除操作，起保护作用。
            }
            file.mkdirs();//如果文件夹不存在，则递归
            for (String fileName : fileList) {
                if(!filePath.isEmpty()) { ;
                    copyAssetsDir2Phone(activity, filePath + File.separator + fileName, destPath);
                }else{
                    copyAssetsDir2Phone(activity, fileName, destPath);
                }
            }
        } else {
            InputStream inputStream = activity.getAssets().open(filePath);
            File file = new File(activity.getFilesDir().getAbsolutePath() + File.separator + destPath + File.separator + filePath);
            if (file.exists()) {
                boolean delete = file.delete();
            }
            if (!file.exists() || file.length() == 0) {
                FileOutputStream fos = new FileOutputStream(file);
                int len = -1;
                byte[] buffer = new byte[1024];
                while ((len = inputStream.read(buffer)) != -1) {
                    fos.write(buffer, 0, len);
                }
                fos.flush();
                inputStream.close();
                fos.close();
            }
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

<Note title="说明">

开发者可以将资源和模型放在 assets 文件夹下。如果开发过程中对资源包的大小有要求、也可以将获取到的资源和模型放在自己的服务器上，并在初始化 SDK 前从服务器上下载下来。从 assets 或服务器下载的资源和模型都需要复制到 `Android/data/"当前应用包名"/files/` 目录下，并将资源和模型的“绝对路径”传递给 SDK 即可。
</Note>

</Step>
<Step title="加载资源和模型">
在调用 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create-1) 接口创建对象之前，先调用 [setResources](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-resources) 接口传入资源和模型路径列表，加载资源，模型。

    ```java
    // 传入资源和模型路径列表，必须在 create 之前调用
    ZegoEffects.setResources(aiResourcesInfos);
    ```
</Step>
</Steps>

## 支持的模型和资源

当前 ZegoEffects SDK 支持的模型和资源，请参考下表：

| 模型/资源 | 描述 | 支持功能 |
| --- | --- | --- |
| CommonResources | 美颜美型通用资源 | 美颜、美型 |
| FaceWhiteningResources | 美白颜色查找表资源 | 美白 |
| RosyResources | 红润颜色查找表资源 | 红润 |
| TeethWhiteningResources | 牙齿美白颜色查找表资源 | 牙齿美白 |
| ColorfulStyleResources | 风格滤镜资源 | 滤镜 |
| MakeupResources | 美妆功能资源 | 腮红、眼睫毛、眼线、眼影、口红、美瞳 |
| FaceDetectionModel | 人脸检测模型 | 人脸检测、大眼、瘦脸 |
| SegmentationModel | 人像分割模型 | 人像分割 |
| SkinColorResources | 美颜调整肤色资源 | 美黑、麦色、冷白、暖白、粉白 |
| ClarityResources | 美颜清晰功能资源 | 清晰 |
