import {
  getApiOccupationRequestBody,
  getApiOutlookRequestBody,
} from 'api/index.type';
import PureRoadMap from 'app/components/RoadMap';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DisplayLarge,
  DisplayMedium,
  DisplayXSmall,
  LabelLarge,
} from 'baseui/typography';
import styled from 'styled-components';
import { ChevronDown } from 'baseui/icon';
import { getApiOccupation, getApiOutlook } from 'api';
import { mock_getApiOccupation, mock_getApiOutlook } from 'api/mockAPIs';
import Sources from './Sources';
import useQuery from 'app/hooks/useQuery';

const mode: 'UI_TEST' | 'API_TEST' = 'API_TEST';

export function DetailPage() {
  const queryParams = useQuery();

  const [query, setQuery] = useState<string | null>(null);
  const [period, setPeriod] = useState<number | null>(null);
  const [periodType, setPeriodType] = useState<string | null>(null);

  const [occupationData, setOccupationData] =
    useState<getApiOccupationRequestBody | null>(null);
  const [outlookData, setOutlookData] =
    useState<getApiOutlookRequestBody | null>(null);
  const [positivesVisible, setPositivesVisible] = useState(false);
  const [negativesVisible, setNegativesVisible] = useState(false);
  const [considerationsVisible, setConsiderationsVisible] = useState(false);
  const [expertViewsVisible, setExpertViewsVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);
  const [conclustionsVisible, setConclustionsVisible] = useState(false);

  const doGetApiOccupation = async (
    query: string,
    period: number,
    periodType: string,
  ) => {
    try {
      const response = await (mode === 'UI_TEST'
        ? mock_getApiOccupation(query, period, periodType)
        : getApiOccupation(query, period, periodType));
      setOccupationData({
        ...response.data,
        content: Object.fromEntries(
          Object.entries(response.data.content).sort(
            (a, b) =>
              parseInt(a[0].split('-')[0]) - parseInt(b[0].split('-')[0]),
          ),
        ),
        additionalData: Object.fromEntries(
          Object.entries(response.data.additionalData).sort(
            (a, b) =>
              parseInt(a[0].split('-')[0]) - parseInt(b[0].split('-')[0]),
          ),
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const doGetApiOutlook = async (query: string) => {
    try {
      const response = await (mode === 'UI_TEST'
        ? mock_getApiOutlook(query)
        : getApiOutlook(query));
      setOutlookData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setQuery(queryParams.get('query') ?? '');
    const rawPeriod = parseInt(queryParams.get('period') ?? '1');
    setPeriod(isNaN(rawPeriod) || rawPeriod <= 0 ? 1 : rawPeriod);
    const rawPeriodType = queryParams.get('periodType');
    setPeriodType(
      rawPeriodType === 'YEAR' || rawPeriodType === 'MONTH'
        ? rawPeriodType
        : 'YEAR',
    );
  }, [queryParams]);

  useEffect(() => {
    if (query && period && periodType) {
      doGetApiOccupation(query, period, periodType);
      doGetApiOutlook(query);
    }
  }, [query, period, periodType]);

  return (
    <>
      <Helmet>
        <title>"{query ?? ''}"의 검색 결과</title>
        <meta name="description" content="Silkroad detail page" />
      </Helmet>
      {query && occupationData !== null && outlookData !== null ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',

              // background: 'linear-gradient(45deg, #fff, #eee)',
              backgroundAttachment: 'fixed',
            }}
          >
            <div style={{ height: '100px' }} />
            <div
              style={{ width: '100%', maxWidth: '1400px', padding: '0 32px' }}
            >
              <div style={{ paddingBottom: '128px' }} />
              <DisplayLarge color="#000">
                {occupationData.occupation.replace("\\",'').replace('"','')}
                {/* {occupationData.title.split(' (')[0]} */}
              </DisplayLarge>
              {/* <div style={{ paddingBottom: '32px' }} />
              <DisplayMedium>
                {'('}
                {occupationData.title.split(' (')[1]}
              </DisplayMedium> */}
              <div style={{ paddingBottom: '128px' }} />
            </div>
            <RoadMapContainer>
              <div style={{ display: 'flex' }}>
                <div
                  style={{ flexShrink: 0, width: 'calc(50% - 700px + 32px)' }}
                />
                <div
                  style={{
                    flexShrink: 0,
                    padding: '36px 0',
                    backgroundColor: '#eee',
                    borderRadius: '36px 0 0 36px',
                  }}
                >
                  <PureRoadMap
                    data={Object.entries(occupationData.content).map(
                      ([title, descriptions]) => ({
                        title,
                        descriptions,
                      }),
                    )}
                  />
                </div>
              </div>
            </RoadMapContainer>
            <div
              style={{ width: '100%', maxWidth: '1400px', padding: '0 32px' }}
            >
              <div style={{ paddingBottom: '64px' }} />
              {/* <div
                onClick={() => {
                  setSourcesVisible(prev => !prev);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '4px',
                  cursor: 'pointer',
                }}
              >
                <DisplayMedium>참고하기 좋은 자료들</DisplayMedium>
                <ChevronDown
                  size={52}
                  overrides={{
                    Svg: {
                      style: {
                        transform: sourcesVisible
                          ? 'rotate(180deg)'
                          : undefined,
                        transition: '200ms',
                      },
                    },
                  }}
                />
              </div> */}
              <DisplayMedium>참고하기 좋은 자료들</DisplayMedium>
              {true ? (
                <>
                  <div style={{ paddingBottom: '48px' }} />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      rowGap: '32px',
                    }}
                  >
                    {Object.entries(occupationData.additionalData).map(
                      ([title, sources], i) => (
                        <Sources
                          key={i}
                          title={title}
                          sources={sources}
                          i={i}
                        />
                      ),
                    )}
                  </div>
                </>
              ) : null}
              <div style={{ paddingBottom: '128px' }} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',

              backgroundColor: '#eee',
              // backgroundImage: `url(${require('resources/thumb-up-dynamic-clay.png')})`,
              // backgroundPosition: '-300px 0px',
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: '1000px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '128px',
                width: '100%',
                maxWidth: '1400px',
                padding: '128px 32px',
              }}
            >
              <DisplayLarge color="#000">{outlookData.title}</DisplayLarge>
              {Object.entries(outlookData.positive).length > 0 &&
              Object.entries(outlookData.negative).length > 0 &&
              Object.entries(outlookData.additionalConsider).length > 0 &&
              Object.entries(outlookData.viewOfExpert).length > 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '64px',
                  }}
                >
                  {Object.entries(outlookData.positive).length > 0 ? (
                    <div>
                      <div
                        onClick={() => {
                          setPositivesVisible(prev => !prev);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {/* <div
                              style={{
                                width: '52px',
                                height: '52px',
                                backgroundImage: `url(${require('resources/thumb-up-dynamic-color.png')})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                              }}
                            />
                            <div style={{ marginRight: '16px' }} /> */}
                        <DisplayMedium>👍</DisplayMedium>
                        <div style={{ marginRight: '16px' }} />
                        <DisplayMedium>긍정적인 평가</DisplayMedium>
                        <div style={{ marginRight: '4px' }} />
                        <ChevronDown
                          size={52}
                          overrides={{
                            Svg: {
                              style: {
                                transform: positivesVisible
                                  ? 'rotate(180deg)'
                                  : undefined,
                                transition: '200ms',
                              },
                            },
                          }}
                        />
                      </div>
                      {positivesVisible ? (
                        <>
                          <div style={{ paddingBottom: '64px' }} />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              rowGap: '48px',
                            }}
                          >
                            {Object.entries(outlookData.positive).map(
                              ([title, description], i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '16px',
                                  }}
                                >
                                  <DisplayXSmall
                                    overrides={{
                                      Block: {
                                        style: {
                                          lineHeight: '1.6em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {title}
                                  </DisplayXSmall>
                                  <LabelLarge
                                    overrides={{
                                      Block: {
                                        style: {
                                          fontSize: '30px',
                                          lineHeight: '1.8em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {description}
                                    {/* {description.split('.').map((sentence, i) =>
                              i + 1 === description.split('.').length ? null : (
                                <Fragment key={i}>
                                  {sentence}.<br />
                                </Fragment>
                              ),
                            )} */}
                                  </LabelLarge>
                                </div>
                              ),
                            )}
                          </div>
                          <div style={{ paddingBottom: '32px' }} />
                        </>
                      ) : null}
                    </div>
                  ) : null}
                  {Object.entries(outlookData.negative).length > 0 ? (
                    <div>
                      <div
                        onClick={() => {
                          setNegativesVisible(prev => !prev);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {/* <div
                            style={{
                              width: '52px',
                              height: '52px',
                              backgroundImage: `url(${require('resources/thumb-down-dynamic-color.png')})`,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'contain',
                            }}
                          />
                          <div style={{ marginRight: '16px' }} /> */}
                        <DisplayMedium>👎</DisplayMedium>
                        <div style={{ marginRight: '16px' }} />
                        <DisplayMedium>부정적인 평가</DisplayMedium>
                        <div style={{ marginRight: '4px' }} />
                        <ChevronDown
                          size={52}
                          overrides={{
                            Svg: {
                              style: {
                                transform: negativesVisible
                                  ? 'rotate(180deg)'
                                  : undefined,
                                transition: '200ms',
                              },
                            },
                          }}
                        />
                      </div>
                      {negativesVisible ? (
                        <>
                          <div style={{ paddingBottom: '64px' }} />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              rowGap: '48px',
                            }}
                          >
                            {Object.entries(outlookData.negative).map(
                              ([title, description], i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '16px',
                                  }}
                                >
                                  <DisplayXSmall
                                    overrides={{
                                      Block: {
                                        style: {
                                          lineHeight: '1.6em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {title}
                                  </DisplayXSmall>
                                  <LabelLarge
                                    overrides={{
                                      Block: {
                                        style: {
                                          fontSize: '30px',
                                          lineHeight: '1.8em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {description}
                                    {/* {description.split('.').map((sentence, i) =>
                              i + 1 === description.split('.').length ? null : (
                                <Fragment key={i}>
                                  {sentence}.<br />
                                </Fragment>
                              ),
                            )} */}
                                  </LabelLarge>
                                </div>
                              ),
                            )}
                          </div>
                          <div style={{ paddingBottom: '32px' }} />
                        </>
                      ) : null}
                    </div>
                  ) : null}
                  {Object.entries(outlookData.additionalConsider).length > 0 ? (
                    <div>
                      <div
                        onClick={() => {
                          setConsiderationsVisible(prev => !prev);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <DisplayMedium>👩‍💻</DisplayMedium>
                        <div style={{ marginRight: '16px' }} />
                        <DisplayMedium>추가적인 고려 사항</DisplayMedium>
                        <div style={{ marginRight: '4px' }} />
                        <ChevronDown
                          size={52}
                          overrides={{
                            Svg: {
                              style: {
                                transform: considerationsVisible
                                  ? 'rotate(180deg)'
                                  : undefined,
                                transition: '200ms',
                              },
                            },
                          }}
                        />
                      </div>
                      {considerationsVisible ? (
                        <>
                          <div style={{ paddingBottom: '64px' }} />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              rowGap: '48px',
                            }}
                          >
                            {Object.entries(outlookData.additionalConsider).map(
                              ([title, description], i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '16px',
                                  }}
                                >
                                  <DisplayXSmall
                                    overrides={{
                                      Block: {
                                        style: {
                                          lineHeight: '1.6em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {title}
                                  </DisplayXSmall>
                                  <LabelLarge
                                    overrides={{
                                      Block: {
                                        style: {
                                          fontSize: '30px',
                                          lineHeight: '1.8em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {description}
                                    {/* {description.split('.').map((sentence, i) =>
                              i + 1 === description.split('.').length ? null : (
                                <Fragment key={i}>
                                  {sentence}.<br />
                                </Fragment>
                              ),
                            )} */}
                                  </LabelLarge>
                                </div>
                              ),
                            )}
                          </div>
                          <div style={{ paddingBottom: '32px' }} />
                        </>
                      ) : null}
                    </div>
                  ) : null}
                  {Object.entries(outlookData.viewOfExpert).length > 0 ? (
                    <div>
                      <div
                        onClick={() => {
                          setExpertViewsVisible(prev => !prev);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <DisplayMedium>👨‍🏫</DisplayMedium>
                        <div style={{ marginRight: '16px' }} />
                        <DisplayMedium>전문가의 견해</DisplayMedium>
                        <div style={{ marginRight: '4px' }} />
                        <ChevronDown
                          size={52}
                          overrides={{
                            Svg: {
                              style: {
                                transform: expertViewsVisible
                                  ? 'rotate(180deg)'
                                  : undefined,
                                transition: '200ms',
                              },
                            },
                          }}
                        />
                      </div>
                      {expertViewsVisible ? (
                        <>
                          <div style={{ paddingBottom: '64px' }} />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              rowGap: '48px',
                            }}
                          >
                            {Object.entries(outlookData.viewOfExpert).map(
                              ([title, description], i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '16px',
                                  }}
                                >
                                  <DisplayXSmall
                                    overrides={{
                                      Block: {
                                        style: {
                                          lineHeight: '1.6em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {title}
                                  </DisplayXSmall>
                                  <LabelLarge
                                    overrides={{
                                      Block: {
                                        style: {
                                          fontSize: '30px',
                                          lineHeight: '1.8em',
                                          wordBreak: 'keep-all',
                                        },
                                      },
                                    }}
                                  >
                                    {description}
                                    {/* {description.split('.').map((sentence, i) =>
                              i + 1 === description.split('.').length ? null : (
                                <Fragment key={i}>
                                  {sentence}.<br />
                                </Fragment>
                              ),
                            )} */}
                                  </LabelLarge>
                                </div>
                              ),
                            )}
                          </div>
                          <div style={{ paddingBottom: '32px' }} />
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : (
                <DisplayMedium>
                  전망을 분석하기 위한 표본이 부족합니다 ;{'('}
                  {/* 전망이 없습니다. 이직을 준비하세요. */}
                </DisplayMedium>
              )}
            </div>
          </div>
          {occupationData.tip.length > 0 && outlookData.result.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',

                // background: 'linear-gradient(45deg, #fff, #eee)',
                backgroundAttachment: 'fixed',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  maxWidth: '1400px',
                  padding: '128px 32px',
                  rowGap: '64px',
                }}
              >
                {occupationData.tip.length > 0 ? (
                  <div>
                    <div
                      onClick={() => {
                        setTipsVisible(prev => !prev);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <DisplayMedium>💡</DisplayMedium>
                      <div style={{ marginRight: '16px' }} />
                      <DisplayMedium>팁</DisplayMedium>
                      <div style={{ marginRight: '4px' }} />
                      <ChevronDown
                        size={52}
                        overrides={{
                          Svg: {
                            style: {
                              transform: tipsVisible
                                ? 'rotate(180deg)'
                                : undefined,
                              transition: '200ms',
                            },
                          },
                        }}
                      />
                    </div>
                    {tipsVisible ? (
                      <>
                        <div style={{ paddingBottom: '64px' }} />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '32px',
                          }}
                        >
                          {occupationData.tip.map((tip, i) => (
                            <div
                              style={{
                                display: 'flex',
                                // columnGap: '4px',
                              }}
                            >
                              <div
                                style={{
                                  padding: '23px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#000',
                                    borderRadius: '50%',
                                  }}
                                />
                              </div>
                              <DisplayXSmall
                                overrides={{
                                  Block: {
                                    style: {
                                      fontWeight: 500,
                                      lineHeight: '1.6em',
                                      wordBreak: 'keep-all',
                                    },
                                  },
                                }}
                              >
                                {tip}
                              </DisplayXSmall>
                            </div>
                            // <DisplayXSmall key={i}>{tip}</DisplayXSmall>
                          ))}
                        </div>
                        <div style={{ paddingBottom: '32px' }} />
                      </>
                    ) : null}
                  </div>
                ) : null}
                {outlookData.result.length > 0 ? (
                  <div>
                    <div
                      onClick={() => {
                        setConclustionsVisible(prev => !prev);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <DisplayMedium>🤷🏻</DisplayMedium>
                      <div style={{ marginRight: '16px' }} />
                      <DisplayMedium>결론</DisplayMedium>
                      <div style={{ marginRight: '4px' }} />
                      <ChevronDown
                        size={52}
                        overrides={{
                          Svg: {
                            style: {
                              transform: conclustionsVisible
                                ? 'rotate(180deg)'
                                : undefined,
                              transition: '200ms',
                            },
                          },
                        }}
                      />
                    </div>
                    {conclustionsVisible ? (
                      <>
                        <div style={{ paddingBottom: '64px' }} />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '16px',
                          }}
                        >
                          {outlookData.result.map((result, i) => (
                            <LabelLarge
                              overrides={{
                                Block: {
                                  style: {
                                    fontSize: '30px',
                                    lineHeight: '1.8em',
                                    wordBreak: 'keep-all',
                                  },
                                },
                              }}
                            >
                              {result}
                            </LabelLarge>
                            // <DisplayXSmall
                            //   key={i}
                            //   overrides={{
                            //     Block: {
                            //       style: {
                            //         fontWeight: 500,
                            //         lineHeight: '1.6em',
                            //         wordBreak: 'keep-all',
                            //       },
                            //     },
                            //   }}
                            // >
                            //   {result}
                            // </DisplayXSmall>
                          ))}
                        </div>
                        <div style={{ paddingBottom: '32px' }} />
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

const RoadMapContainer = styled.div`
  width: 100%;
  background-color: transparent;
  overflow: scroll;

  // hide scrollbar ui
  // Chrome, Safari and Opera
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
`;
