<Title>调用 “enablePublishDirectToCDN” 直推 CDN，停止推流后，是否需要再将 “enablePublishDirectToCDN” 重新设置成 “false”？</Title>



- - -

是需要的，建议成对调用该接口，在每次停止推流后重新设置成 “false”。