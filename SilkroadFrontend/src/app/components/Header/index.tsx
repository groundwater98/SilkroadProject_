import useQuery from 'app/hooks/useQuery';
import { Button, KIND, SHAPE } from 'baseui/button';
import { Filter, Search } from 'baseui/icon';
import { Input, SIZE } from 'baseui/input';
import { HeadingXLarge, LabelMedium } from 'baseui/typography';
import { StatefulPopover } from 'baseui/popover';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from 'baseui/select';
import { ALIGN, Radio, RadioGroup } from 'baseui/radio';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useQuery();

  // const [isTop, setIsTop] = useState(true);
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);
  const [period, setPeriod] = useState(1);
  const [periodType, setPeriodType] = useState('YEAR');

  // const handleScroll = useCallback(() => {
  //   setIsTop(document.documentElement.scrollTop < 48);
  // }, []);

  const submit = async () => {
    if (query.trim() === '') {
      setQueryError(true);
      return;
    }
    setQueryError(false);

    document.location.href = `/detail?query=${query}&period=${period}&periodType=${periodType}`;
  };

  // useLayoutEffect(() => {
  //   setIsTop(document.documentElement.scrollTop < 48);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

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

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100px',
        backgroundColor: '#fff',
        // backgroundColor: isTop ? 'transparent' : '#fff',
        // transition: '200ms',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: '32px',
          width: '100%',
          maxWidth: '1400px',
          padding: '0 32px',
        }}
      >
        <HeadingXLarge
          onClick={() => {
            navigate('/');
          }}
          style={{ color: '#000', cursor: 'pointer' }}
        >
          Silkroad
        </HeadingXLarge>
        {location.pathname.split('/')[1] === 'detail' ? (
          <div
            style={{
              display: 'flex',
              columnGap: '8px',
              width: '500px',
            }}
          >
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="백엔드 개발자, 교육학연구원, 악기제조원 ..."
              clearOnEscape
              error={queryError}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
            />
            <StatefulPopover
              content={() => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '16px',
                    padding: '16px',
                  }}
                >
                  <Select
                    clearable={false}
                    searchable={false}
                    value={[{ id: period, label: `${period}` }]}
                    size={SIZE.compact}
                    options={[
                      { id: 1, label: '1' },
                      { id: 2, label: '2' },
                      { id: 3, label: '3' },
                      { id: 4, label: '4' },
                      { id: 5, label: '5' },
                      { id: 6, label: '6' },
                      { id: 7, label: '7' },
                      { id: 8, label: '8' },
                      { id: 9, label: '9' },
                      { id: 10, label: '10' },
                      { id: 11, label: '11' },
                    ]}
                    onChange={params => {
                      setPeriod(Number(params.value[0].id));
                    }}
                    overrides={{
                      Root: { style: { width: '64px' } },
                      Popover: {
                        props: {
                          overrides: { Body: { style: { zIndex: '10' } } },
                        },
                      },
                    }}
                  />
                  <RadioGroup
                    value={periodType}
                    onChange={e => setPeriodType(e.currentTarget.value)}
                    // name="periodType"
                    align={ALIGN.horizontal}
                    overrides={{
                      RadioGroupRoot: { style: { columnGap: '8px' } },
                    }}
                  >
                    <Radio value="YEAR">년</Radio>
                    <Radio
                      value="MONTH"
                      // overrides={{ Label: { style: { whiteSpace: 'nowrap' } } }}
                    >
                      개월
                    </Radio>
                  </RadioGroup>
                </div>
              )}
              returnFocus
              autoFocus
              overrides={{
                Body: {
                  style: { zIndex: '10' },
                },
              }}
            >
              <Button kind={KIND.secondary}>
                <Filter
                  overrides={{ Svg: { style: { transform: 'scale(1.4)' } } }}
                />
              </Button>
            </StatefulPopover>

            <Button
              onClick={() => {
                submit();
              }}
              overrides={{
                BaseButton: {
                  style: {
                    whiteSpace: 'nowrap',
                  },
                },
              }}
            >
              {/* 찾아보기 */}
              <Search
                overrides={{ Svg: { style: { transform: 'scale(1.4)' } } }}
              />
            </Button>
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '32px',
          }}
        >
          <LabelMedium
            style={{ color: '#000', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Sign In
          </LabelMedium>
          <Button
            shape={SHAPE.pill}
            overrides={{
              BaseButton: {
                style: { whiteSpace: 'nowrap' },
              },
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
