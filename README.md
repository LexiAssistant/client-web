# Epson client

> ### 실행방법
>
> `npm install`  
> `npm start`
>
> ### 테스트 서버 실행방법
>
> `cd test_server`  
> `node server.js`

### 자체 프레임워크 구성

1. **코드 스플리팅**: Webpack의 코드 스플리팅 기능을 활용하여 번들을 최적화
2. **이미지 최적화**: 이미지 파일을 효율적으로 로드하기 위해 file-loader 또는 url-loader를 사용
3. **CSS 최적화**: css-loader와 style-loader를 사용하여 CSS를 로드하고 최적화
4. **React.lazy와 Suspense**: 동적 import를 활용하여 컴포넌트를 필요할 때 로드
