import { Button, SIZE as buttonSize } from 'baseui/button';
import { Search } from 'baseui/icon';
import { Input, SIZE as inputSize } from 'baseui/input';
import { DisplayLarge, DisplayXSmall } from 'baseui/typography';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Select } from 'baseui/select';

export function HomePage() {
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);
  const [period, setPeriod] = useState(1);
  const [periodType, setPeriodType] = useState('YEAR');
  const [filterVisible, setFilterVisible] = useState(false);

  const submit = async () => {
    if (query.trim() === '') {
      setQueryError(true);
      return;
    }
    setQueryError(false);

    document.location.href = `/detail?query=${query}&period=${period}&periodType=${periodType}`;
  };

  return (
    <>
      <Helmet>
        <title>홈</title>
        <meta name="description" content="Silkroad home page" />
      </Helmet>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          // backgroundColor: 'beige',
          // background: 'linear-gradient(45deg, #fff, #eee)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-200px',
            bottom: '-300px',
            width: '1000px',
            height: '1000px',
            // backgroundImage: `url(${require('resources/rocket-dynamic-clay.png')})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DisplayLarge>여러분의 꿈을 이루세요</DisplayLarge>
          <div style={{ marginTop: '32px' }} />
          <DisplayXSmall>
            Silkroad는 목표 직업을 향한 구체적인 로드맵을 제시합니다
          </DisplayXSmall>
          <div style={{ marginTop: '16px' }} />
          <DisplayXSmall>지금 바로 로드맵을 만들어보세요</DisplayXSmall>
          <div style={{ marginTop: '48px' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '8px',
              width: '100%',
              maxWidth: '600px',
            }}
          >
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="백엔드 개발자, 교육학연구원, 악기제조원 ..."
              clearOnEscape
              error={queryError}
              startEnhancer={() => <Search size={36} />}
              size={inputSize.large}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
            />
            <Button
              onClick={() => {
                submit();
              }}
              size={buttonSize.large}
              overrides={{
                BaseButton: {
                  style: {
                    whiteSpace: 'nowrap',
                  },
                },
              }}
            >
              찾아보기
            </Button>
          </div>
          <div style={{ paddingBottom: '16px' }} />
          <div
            style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}
          >
            <DisplayXSmall
              onClick={() => {
                setFilterVisible(prev => !prev);
              }}
              overrides={{
                Block: {
                  style: {
                    marginRight: '16px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    // fontStyle: 'italic',
                    // textDecoration: 'underline',
                  },
                },
              }}
            >
              목표 기간 설정
            </DisplayXSmall>
            {filterVisible ? (
              <>
                <Select
                  clearable={false}
                  searchable={false}
                  value={[{ id: period, label: `${period}` }]}
                  size={inputSize.compact}
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
                  overrides={{ Root: { style: { width: '64px' } } }}
                />
                {/* <Input
              value={period}
              onChange={e => {
                const value = parseInt(e.target.value);
                setPeriod(isNaN(value) || value <= 0 ? 1 : value);
              }}
              size={inputSize.compact}
              overrides={{ Root: { style: { width: '50px' } } }}
            /> */}
                {/* <Slider
              value={[period]}
              onChange={({ value }) => value && setPeriod(value[0])}
              min={1}
              max={11}
              // persistentThumb
              overrides={{
                Root: {
                  // style: { paddingTop: '64px' },
                },
              }}
            /> */}
                <RadioGroup
                  value={periodType}
                  onChange={e => setPeriodType(e.currentTarget.value)}
                  // name="periodType"
                  align={ALIGN.horizontal}
                  overrides={{
                    RadioGroupRoot: {
                      style: { columnGap: '8px' },
                    },
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
