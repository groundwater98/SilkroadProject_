import { ChevronDown } from 'baseui/icon';
import { DisplayXSmall } from 'baseui/typography';
import { useState } from 'react';

export default function Sources({
  title,
  sources,
  i,
}: {
  title: string;
  sources: string[];
  i: number;
}) {
  const [sourcesVisible, setSourcesVisible] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#eee',
        // borderRadius: '24px',
        // overflow: 'hidden',
      }}
    >
      <div
        onClick={() => {
          setSourcesVisible(prev => !prev);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 36px 24px calc(36px + 8px)',
          background: `linear-gradient(to right, ${
            ['#3C1FCB', '#9237CF', '#DB5EA1', '#EAB46A'][i % 4]
          } 8px, #eee 8px)`,
          // backgroundColor: '#e8e8e8',
          // borderRadius: '18px',
          cursor: 'pointer',
        }}
      >
        <DisplayXSmall
          color="#000"
          overrides={{ Block: { style: { userSelect: 'none' } } }}
        >
          {title}
        </DisplayXSmall>
        <ChevronDown
          size={36}
          overrides={{
            Svg: {
              style: {
                fill: '#000',
                transform: sourcesVisible ? 'rotate(180deg)' : undefined,
                transition: '200ms',
              },
            },
          }}
        />
      </div>
      {sourcesVisible ? (
        <>
          <div style={{ marginBottom: '16px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '24px',
              padding: '18px 36px 48px 36px',
            }}
          >
            {sources.map((source, i) => (
              <div
                style={{
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    padding: '19px',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#000',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <DisplayXSmall
                  overrides={{
                    Block: {
                      style: {
                        lineHeight: '1.5em',
                        fontSize: '32px',
                        fontWeight: 500,
                      },
                    },
                  }}
                >
                  {source}
                </DisplayXSmall>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
