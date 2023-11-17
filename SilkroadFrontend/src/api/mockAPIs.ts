import { AxiosResponse } from 'axios';
import {
  getApiOccupationRequestBody,
  getApiOutlookRequestBody,
} from './index.type';

export const mock_getApiOccupation = (
  occupation: string,
  period: number,
  periodType: string,
) =>
  new Promise<AxiosResponse<getApiOccupationRequestBody>>(resolve => {
    setTimeout(() => {
      resolve({
        // `data` is the response that was provided by the server
        data: {
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
        },

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

export const mock_getApiOutlook = (occupation: string) =>
  new Promise<AxiosResponse<getApiOutlookRequestBody>>(resolve => {
    setTimeout(() => {
      resolve({
        // `data` is the response that was provided by the server
        data: {
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
        },

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
