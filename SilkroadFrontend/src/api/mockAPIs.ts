import { AxiosResponse } from 'axios';
import {
  getApiOccupationRequestBody,
  getApiOutlookRequestBody,
} from './index.type';

const OCCUPATION_DATA_1 = {
  occupation: '프론트엔드 개발자',
  title: '',
  content: {
    '1-2개월': [
      ' 구조와 의미론, 레이아웃과 포지셔닝, 스타일링을 포함한 HTML과 CSS의 기본 개념 학습',
      ' DOM에 대해 학습하고, JavaScript를 사용하여 DOM을 조작하는 방법 습득',
      ' HTML, CSS, JavaScript를 이용하여 간단한 정적 웹사이트 구축',
    ],
    '3-4개월': [
      ' 컴포넌트 기반 개발에 대해 학습하고, React를 이용하여 재사용 가능하고 유지보수가 용이한 UI 구축방법 습득',
      ' 상태 관리에 대해 학습하고, Redux를 사용하여 상태의 일관성과 예측 가능성 유지하는 방법 습득',
      ' 상태와 Redux를 활용한 동적 React 애플리케이션 구축',
    ],
    '5-6개월': [
      ' REST API에 대해 학습하고, 데이터를 가져오기와 전송하기 위해 REST API를 사용하는 방법 습득',
      ' 인증 및 권한 부여에 대해 학습하고, 응용 프로그램에서 이를 구현하는 방법 습득',
      ' React, Redux 및 REST API를 활용한 풀스택 웹 애플리케이션 구축',
    ],
  },
  additionalData: {
    '1-2개월': [
      ' Udemy의 Jonas Schmedtmann의 "The Complete JavaScript Course 2023: From Zero to Expert!"',
      ' Udemy의 Rob Percival의 "HTML & CSS: The Complete Guide (Including Advanced Topics)"',
      ' Amazon의 Jon Duckett의 "Responsive Web Design with HTML5 and CSS3"',
    ],
    '3-4개월': [
      ' Udemy의 Andrei Neagoie의 "The Complete React Developer Course (3rd Edition)"',
      ' Udemy의 Maximilian Schwarzmüller의 "Redux: A Complete Tutorial from Scratch"',
      ' Amazon의 Stoyan Stefanov의 "React Patterns: 10 Patterns for Building Reusable and Maintainable UIs"',
    ],
    '5-6개월': [
      ' Udemy의 Brad Traversy의 "REST APIs with Node.js, Express & MongoDB"',
      ' Udemy의 Brad Traversy의 "Authentication and Authorization with Node.js, Express & JWT"',
      ' Udemy의 Andrei Neagoie의 "The Complete Full-Stack Web Developer Course (with React & Node.js)"',
    ],
  },
  tip: [
    '오픈 소스 프론트엔드 프로젝트에 기여하기',
    '자체 프로젝트 구축 및 포트폴리오 웹사이트에 프로젝트 공유',
    '다른 프론트엔드 개발자들과 교류하며 경험 공유',
    '최신 프론트엔드 동향과 기술에 대해 업데이트 유지',
  ],
}
const OCCUPATION_DATA_2 = {
  occupation: '백엔드 개발자',
  title: '1년간의 백엔드 개발자 로드맵 (월간 기준)',
  content: {
    '10-12개월': [
      ' 클라우드 컴퓨팅 플랫폼에 대해 학습하고 백엔드 애플리케이션을 클라우드에 배포하는 방법 학습',
      ' 서버리스 컴퓨팅 및 컨테이너화 기술에 대해 학습',
      ' 모니터링 및 관찰성 최적의 방법 학습',
    ],
    '1-3개월': [
      ' 프로그래밍 언어, 데이터베이스, 웹 서버 등 백엔드 개발의 기본 사항 학습',
      ' Django나 Flask와 같은 인기 있는 프레임워크를 사용하여 간단한 백엔드 애플리케이션 구축',
      ' 애플리케이션을 운영 환경에 배포하기',
    ],
    '4-6개월': [
      ' 백엔드 아키텍처와 디자인 패턴에 대해 학습',
      ' 캐싱과 로드 밸런싱에 대해 학습',
      ' 백엔드 개발을 위한 보안 최적의 방법 학습',
    ],
    '7-9개월': [
      ' 분산 시스템과 마이크로서비스에 대해 학습',
      ' 메시지 큐 및 비동기 통신에 대해 학습',
      ' 테스트 및 지속적인 통합/지속적인 배포 (CI/CD)에 대해 학습',
    ],
  },
  additionalData: {
    '10-12개월': [
      ' AWS Certified Solutions Architect - Associate',
      ' Microsoft Azure Solutions Architect Expert',
      ' Google Cloud Certified Professional Cloud Architect',
    ],
    '1-3개월': [
      ' Google Cloud Certified Professional Cloud Developer',
      ' AWS Certified Developer - Associate',
      ' Microsoft Azure Developer Associate',
    ],
    '4-6개월': [
      ' "Clean Architecture: A Craftsman\'s Guide to Software Structure and Design" - Robert C. Martin',
      ' "Design Patterns: Elements of Reusable Object-Oriented Software" - Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      ' "Web Application Security" - OWASP',
    ],
    '7-9개월': [
      ' "Building Microservices" - Sam Newman',
      ' "Messaging Patterns" - Gregor Hohpe',
      ' "Continuous Delivery: Reliable Software Releases Through Build, Test, and Deployment Automation" - Jez Humble, David Farley',
    ],
  },
  tip: [
    ' 최신 백엔드 개발 동향과 기술을 학습하고 따르세요.',
    ' 백엔드 개발 블로그와 기사를 읽으세요.',
    ' 백엔드 개발 컨퍼런스와 이벤트에 참석하세요.',
    ' 다른 백엔드 개발자들과 네트워킹하세요.',
  ],
}
const OUTLOOK_DATA_1 = {
  occupation: '프론트엔드 개발자',
  title: '프론트엔드 개발자의 미래 전망',
  positive: {
    '수요 증가:':
      '기업들이 디지털 프레젠스에 투자할 것이므로, 프론트엔드 개발자에 대한 수요는 앞으로 크게 증가할 전망입니다. 웹사이트와 웹 어플리케이션의 사용이 증가하고, 모바일 기기와 사물 인터넷(IoT)의 인기가 높아지는 것이 원인입니다.',
    '높은 연봉:':
      '프론트엔드 개발자는 가장 높은 급여를 받는 소프트웨어 개발자 중 하나입니다. 미국에서 프론트엔드 개발자의 연간 중위 연봉은 10만 달러를 넘습니다.',
    '직업 안정성:':
      '프론트엔드 개발자는 수요가 많기 때문에 안정된 직업 안정성을 가지고 있습니다. 경기 침체 기간에도 이미 존재하는 웹사이트와 웹 어플리케이션을 유지보수하고 업데이트하고 새로운 것을 개발하는 프론트엔드 개발자의 필요성이 여전히 있습니다.',
    '진급 기회:':
      '프론트엔드 개발자에게는 진급 기회가 많이 있습니다. 관리 역할로 전환하거나, 사용자 인터페이스 디자인, 사용자 경험 디자인, 성능 최적화와 같은 프론트엔드 개발의 특정 분야에 전문화할 수 있습니다.',
  },
  negative: {
    '경쟁:':
      '프론트엔드 개발자의 일자리 경쟁은 특히 입문 수준의 포지션에서 치열할 수 있습니다. 경쟁 상황에서 두각을 나타내기 위해 강력한 작업 포트폴리오를 갖고 최신 기술에 능숙해야 합니다.',
    '지속적인 학습 필요:':
      '프론트엔드 개발 분야는 지속적으로 진화하므로, 개발자들은 최신 동향과 기술에 대해 계속해서 업데이트해야 합니다. 이는 상당한 시간과 노력을 필요로 할 수 있습니다.',
    '스트레스가 많은 작업 환경:':
      '프론트엔드 개발자들은 종종 시간이 촉박하게 작업하고 복잡한 문제에 대처해야 합니다. 특히 신입 개발자들에게는 스트레스를 유발할 수 있는 작업 환경일 수 있습니다.',
  },
  additionalConsider: {
    '인공지능(AI)과 머신 러닝(ML)의 부상:':
      'AI와 ML은 프론트엔드 개발을 포함한 소프트웨어 개발의 작업을 자동화하는 데 점점 더 사용되고 있습니다. 이는 일부 지역에서 프론트엔드 개발자에 대한 수요 감소로 이어질 수 있습니다. 하지만 AI와 ML은 또한 AI 기반 웹 어플리케이션과 ML 기반 사용자 인터페이스 개발과 같은 프론트엔드 개발자에게 새로운 기회를 제공하고 있습니다.',
    '클라우드 컴퓨팅으로의 전환:':
      '클라우드 컴퓨팅으로의 전환은 프론트엔드 개발 분야에 영향을 미치는 또 다른 큰 동향입니다. 클라우드 컴퓨팅을 통해 개발자들은 웹 어플리케이션을 더 쉽고 효율적으로 배포하고 확장할 수 있습니다. 하지만 이를 위해서는 클라우드 기반 개발 플랫폼과 도구에 대한 경험과 지식과 같은 새로운 기술과 지식을 갖추어야 합니다.',
     },
  viewOfExpert: {
    },
  result: [
    '전반적으로, 프론트엔드 개발자들의 미래 전망은 좋습니다.',
    '프론트엔드 개발자에 대한 수요는 앞으로 크게 증가할 전망이며, 그들은 가장 높은 급여를 받는 소프트웨어 개발자 중 하나입니다.',
    '그러나 프론트엔드 개발자의 일자리 경쟁은 치열할 수 있으며, 개발자들은 최신 동향과 기술에 대해 계속해서 업데이트해야 합니다.',
    '클라우드 기반 환경에서 작업할 수 있는 기술과 AI와 ML을 활용하여 작업을 향상시킬 수 있는 기술을 개발함으로써 프론트엔드 개발자는 앞으로의 성공을 위한 포지셔닝을 할 수 있습니다.',
  ],
}
const OUTLOOK_DATA_2 = {
  occupation: '백엔드 개발자',
  title: '백엔드 개발자의 미래 전망',
  positive: {
    '승진 기회:':
      '백엔드 개발자는 자신의 경력을 발전시키기 위한 많은 기회가 있습니다. 관리 역할로 전환하거나 클라우드 컴퓨팅, 데이터 과학, 머신 러닝과 같은 특정 분야의 백엔드 개발에 전문화 할 수 있습니다.',
    '성장하는 수요:':
      '비즈니스가 디지털 변환에 투자하는 동안 백엔드 개발자에 대한 수요가 앞으로 몇 년 동안 크게 증가할 것으로 예상됩니다. 웹 응용 프로그램, 모바일 앱 및 클라우드 기반 서비스의 사용이 증가함에 따라 이러한 변화가 주도되고 있습니다.',
    '높은 연봉:':
      '백엔드 개발자는 최고 수준의 소프트웨어 개발자 중 하나입니다. 미국에서 백엔드 개발자의 중간 연봉은 100,000달러를 웃돕니다.',
    '직업 안정성:':
      '백엔드 개발자는 많은 수요가 있으므로 좋은 직업 안정성을 가지고 있습니다. 경기 침체 기간에도 기존 시스템을 유지 및 업데이트하기 위해 백엔드 개발자에 대한 필요성이 여전히 있습니다.',
  },
  negative: {
    '스트레스 있는 작업 환경:':
      '백엔드 개발자는 종종 타이트한 마감일 하에 복잡한 문제를 다루어야 합니다. 특히 새로운 개발자에게는 스트레스를 유발할 수 있는 작업 환경입니다.',
    '경쟁:':
      '백엔드 개발자 채용 경쟁은 특히 입문 수준의 직책에는 치열 할 수 있습니다. 경쟁에서 눈에 띄기 위해서는 강력한 포트폴리오를 갖고 최신 기술에 능란해야 합니다.',
    '계속적인 학습 필요:':
      '백엔드 개발 분야는 지속적으로 진화하고 있기 때문에 개발자는 최신 동향과 기술에 대해 계속해서 최신 정보를 유지해야 합니다. 이는 상당한 시간과 노력 투자를 요구할 수 있습니다.',
  },
  additionalConsider: {
    '인공지능(AI)과 기계 학습(ML)의 부상:':
      'AI와 ML은 소프트웨어 개발에서 많은 작업을 자동화하기 위해 점점 더 많이 사용되고 있습니다. 이로 인해 어떤 분야에서는 백엔드 개발자의 수요가 줄어들 수도 있습니다. 하지만 AI와 ML은 또한 AI 기반 응용 프로그램 및 ML 기반 알고리즘 개발과 같은 새로운 백엔드 개발 기회를 창출하고 있습니다.',
    '다른 백엔드 개발자들과 네트워크를 형성하십시오.':
      '이는 새로운 기술과 기회에 대해 배우는 좋은 방법입니다.',
    '문제 해결 및 분석 능력을 개발하십시오.':
      '이러한 기술은 백엔드 개발자에게 필수적이며 앞으로 더욱 중요해질 것입니다.',
    '강력한 포트폴리오를 구축하십시오.':
      '이는 취업시 경쟁에서 눈에 띄는데 도움이 됩니다.',
    '최신 동향과 기술에 대해 최신 정보를 유지하십시오.':
      '이는 AI, ML, 클라우드 컴퓨팅 및 기타 새로운 기술들을 포함합니다.',
    '클라우드 컴퓨팅으로의 전환:':
      '클라우드 컴퓨팅으로의 전환은 백엔드 개발 분야에 영향을 미치는 또 다른 주요 트렌드입니다. 클라우드 컴퓨팅은 개발자가 응용 프로그램을 더 쉽고 효율적으로 배포 및 확장할 수 있게 해줍니다. 그러나 이는 개발자가 새로운 기술과 지식을 가져야 하는 요구 사항이기도 합니다.',
  },
  viewOfExpert: {
    '문제 해결 및 분석 능력이 강한 백엔드 개발자는 항상 수요가 있을 것입니다.':
      '비즈니스 요구 사항을 이해하고 복잡한 문제를 해결하는 능력은 백엔드 개발자에게 필수적입니다.',
    'AI와 ML 기술에 능숙한 백엔드 개발자는 수요가 높을 것입니다.':
      'AI와 ML은 소프트웨어 개발에서 많은 작업을 자동화하는 데 사용되지만 백엔드 개발자에게는 새로운 기회를 창출하여 새롭고 혁신적인 응용 프로그램을 개발할 수 있습니다.',
    '클라우드 컴퓨팅에 익숙한 백엔드 개발자 또한 수요가 많을 것입니다.':
      '클라우드 컴퓨팅은 응용 프로그램을 배포하고 확장하는 표준이 되고 있습니다.',
    '백엔드 개발자에 대한 수요는 앞으로의 몇 년 동안 평균 이상으로 빠르게 증가할 것으로 예상됩니다.':
      '이는 웹 기반 응용 프로그램, 모바일 앱 및 클라우드 기반 서비스에 대한 의존성의 증가 때문입니다.',
  },
  result: [
    '백엔드 개발의 미래는 밝습니다. 그러나 개발자는 앞으로 나아가기 위해 도전과 기회에 대해 인식해야 합니다. 최신 동향과 기술에 대해 최신 정보를 유지하고 클라우드 기반 환경에서 작업할 수 있는 기술을 개발함으로써 백엔드 개발자는 앞으로의 성공을 위한 위치를 잡을 수 있습니다.',
    '위의 내용 외에도, 전문가 관점에서 백엔드 개발자의 미래 전망에 대해 몇 가지 추가적인 생각을 제시합니다:',
    '총론적으로, 백엔드 개발자의 미래 전망은 매우 좋습니다. 백엔드 개발자에 대한 수요는 앞으로 몇 년 동안 크게 증가할 것으로 예상되며, 적합한 기술과 경험을 갖춘 백엔드 개발자는 수요가 높을 것입니다.',
    '백엔드 개발자이시라면, 앞으로의 성공을 위해 앞서 나갈 수 있는 몇 가지 팁을 제시합니다:',
    '이러한 팁을 따르면 앞으로의 몇 년 동안 백엔드 개발자로서 성공할 수 있는 위치에 자리 잡을 수 있습니다.',
  ],
}

export const mock_getApiOccupation = (
  occupation: string,
  period: number,
  periodType: string,
  type: number,
) => {
  return new Promise<AxiosResponse<getApiOccupationRequestBody>>(resolve => {
    setTimeout(() => {
      resolve({
        // `data` is the response that was provided by the server
        data: type === 1 ? OCCUPATION_DATA_1 : OCCUPATION_DATA_2,

        // `status` is the HTTP status code from the server response
        status: 200,

        // `statusText` is the HTTP status message from the server response
        // As of HTTP/2 status text is blank or unsupported.
        // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
        statusText: 'OK',

        // `headers` the HTTP headers that the server responded with
        // All header names are lower cased and can be accessed using the bracket notation.
        // Example: `response.headers['content-type']`
        headers: {},

        // `config` is the config that was provided to `axios` for the request
        // @ts-ignore
        config: {},

        // `request` is the request that generated this response
        // It is the last ClientRequest instance in node.js (in redirects)
        // and an XMLHttpRequest instance in the browser
        request: {},
      });
    }, Math.floor(Math.random() * 1000 + 2500));
  });
};

export const mock_getApiOutlook = (occupation: string,type: number,) =>
  new Promise<AxiosResponse<getApiOutlookRequestBody>>(resolve => {
    setTimeout(() => {
      resolve({
        // `data` is the response that was provided by the server
        data: type === 1 ? OUTLOOK_DATA_1 : OUTLOOK_DATA_2,

        // `status` is the HTTP status code from the server response
        status: 200,

        // `statusText` is the HTTP status message from the server response
        // As of HTTP/2 status text is blank or unsupported.
        // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
        statusText: 'OK',

        // `headers` the HTTP headers that the server responded with
        // All header names are lower cased and can be accessed using the bracket notation.
        // Example: `response.headers['content-type']`
        headers: {},

        // `config` is the config that was provided to `axios` for the request
        // @ts-ignore
        config: {},

        // `request` is the request that generated this response
        // It is the last ClientRequest instance in node.js (in redirects)
        // and an XMLHttpRequest instance in the browser
        request: {},
      });
    }, Math.floor(Math.random() * 1000 + 2500));
  });
