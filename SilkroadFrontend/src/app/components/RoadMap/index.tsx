import { useEffect, useMemo, useRef, useState } from 'react';

const TEXT_HEIGHT = 21.33333396911621;
const DESCRIPTION_RECT_PADDING = 18;
const DESCRIPTION_RECT_R = 18;
const DESCRIPTION_HEIGHT = TEXT_HEIGHT + 2 * DESCRIPTION_RECT_PADDING;
const DESCRIPTION_MARGIN = 9;
const DESCRIPTION_TOTAL_HEIGHT = DESCRIPTION_HEIGHT + DESCRIPTION_MARGIN;
const DESCRIPTIONS_INDENTATION = 72;
const ELEMENT_START_POSITION = 144;
const END_PADDING = 72;
const LINE_MARGIN = 36;
const CIRCLE_R = 8;
const COLORS = [
  '#3C1FCB',
  '#9237CF',
  '#DB5EA1',
  '#EAB46A',
  // '#3CEFE9',
  // '#6BD969',
  // '#FFCC1A',
];
const LINE_COLOR = '#000';
const LINE_WIDTH = 4;

export type DataType = {
  title: string;
  descriptions: string[];
}[];
interface RoadMapProps {
  data: DataType;
}

function Description({
  i,
  description,
  bgColor,
  indented = false,
}: {
  i: number;
  description: string;
  bgColor: string;
  indented?: boolean;
}) {
  const textRef = useRef<SVGTextElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (rectRef.current === null || textRef.current === null) {
      return;
    }

    const rect = rectRef.current;
    const text = textRef.current;
    const textBBox = text.getBBox();

    rect.setAttribute(
      'width',
      `${textBBox.width + 2 * DESCRIPTION_RECT_PADDING}`,
    );

    // console.log('TEXT_HEIGHT', textBBox.height);
  }, []);

  return (
    <g
      transform={`translate(${indented ? DESCRIPTIONS_INDENTATION : 0}, ${
        i * DESCRIPTION_TOTAL_HEIGHT
      })`}
    >
      <rect
        ref={rectRef}
        height={DESCRIPTION_HEIGHT}
        rx={DESCRIPTION_RECT_R}
        ry={DESCRIPTION_RECT_R}
        fill={bgColor}
      ></rect>
      <g
        transform={`translate(${DESCRIPTION_RECT_PADDING}, ${DESCRIPTION_RECT_PADDING})`}
      >
        <text
          ref={textRef}
          y="1em"
          fill="#fff"
          fontFamily='system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif'
          fontSize="18px"
          fontWeight="500"
        >
          {description}
        </text>
      </g>
    </g>
  );
}

function Element({
  i: elementIndex,
  title,
  descriptions,
  elementWidths,
  setElementWidths,
  maxEvenDescriptionsLength,
}: {
  i: number;
  title: string;
  descriptions: string[];
  elementWidths: number[];
  setElementWidths: any;
  maxEvenDescriptionsLength: number;
}) {
  const absoluteX = useMemo(
    () =>
      elementWidths.reduce(
        (accumulator, currentValue, i) =>
          i < elementIndex ? accumulator + currentValue : accumulator,
        ELEMENT_START_POSITION,
      ),
    [elementWidths, elementIndex],
  );
  const absoluteY = useMemo(
    () =>
      elementIndex % 2 === 0
        ? (maxEvenDescriptionsLength - descriptions.length) *
          DESCRIPTION_TOTAL_HEIGHT
        : maxEvenDescriptionsLength * DESCRIPTION_TOTAL_HEIGHT +
          DESCRIPTION_HEIGHT +
          LINE_MARGIN,
    [elementIndex, maxEvenDescriptionsLength, descriptions.length],
  );

  const rootRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (rootRef.current === null) {
      return;
    }

    const root = rootRef.current;
    const rootBBox = root.getBBox();

    setElementWidths(prev => {
      const next = [...prev];
      next[elementIndex] = rootBBox.width;
      return next;
    });
  }, [elementIndex, setElementWidths]);

  return (
    <g ref={rootRef} transform={`translate(${absoluteX}, ${absoluteY})`}>
      <Description
        key={0}
        i={0}
        description={title}
        bgColor={COLORS[elementIndex % COLORS.length]}
      />
      {descriptions.map((description, i) => (
        <g key={i}>
          <path
            d={`M ${DESCRIPTIONS_INDENTATION / 2} ${DESCRIPTION_HEIGHT} C ${
              DESCRIPTIONS_INDENTATION / 2
            } ${DESCRIPTION_HEIGHT}, ${DESCRIPTIONS_INDENTATION / 2} ${
              DESCRIPTION_HEIGHT +
              (i + 1) * (DESCRIPTION_MARGIN + DESCRIPTION_HEIGHT / 2) +
              (i * DESCRIPTION_HEIGHT) / 2
            }, ${DESCRIPTIONS_INDENTATION} ${
              DESCRIPTION_HEIGHT +
              (i + 1) * (DESCRIPTION_MARGIN + DESCRIPTION_HEIGHT / 2) +
              (i * DESCRIPTION_HEIGHT) / 2
            }`}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH}
            fill="transparent"
          />
          <Description
            key={i + 1}
            i={i + 1}
            description={description}
            bgColor={COLORS[elementIndex % COLORS.length]}
            indented
          />
        </g>
      ))}
    </g>
  );
}

export default function RoadMap({ data }: RoadMapProps) {
  const maxEvenDescriptionsLength = data.reduce(
    (prev, currentValue, i) =>
      i % 2 === 0
        ? prev > currentValue.descriptions.length
          ? prev
          : currentValue.descriptions.length
        : prev,
    0,
  );
  const lineY =
    maxEvenDescriptionsLength * DESCRIPTION_TOTAL_HEIGHT +
    DESCRIPTION_HEIGHT +
    LINE_MARGIN / 2;

  const svgRef = useRef<SVGSVGElement>(null);
  const theHighestGRef = useRef<SVGGElement>(null);

  const [elementWidths, setElementWidths] = useState<number[]>([]);

  useEffect(() => {
    if (svgRef.current === null || theHighestGRef.current === null) {
      return;
    }

    const svg = svgRef.current;
    const theHighestG = theHighestGRef.current;
    const theHighestGBBox = theHighestG.getBBox();

    svg.setAttribute('width', `${theHighestGBBox.width + END_PADDING}`);
    svg.setAttribute('height', `${theHighestGBBox.height}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgRef.current, theHighestGRef.current]);

  return (
    <svg ref={svgRef}>
      <g ref={theHighestGRef}>
        <path
          d={`M 0 ${lineY - 16} L 23 ${lineY} L 0 ${lineY + 16} Z`}
          fill={LINE_COLOR}
        />
        <path
          d={`M 0 ${lineY} H ${
            elementWidths.reduce(
              (accumulator, currentValue, i) =>
                i < data.length - 1 ? accumulator + currentValue : accumulator,
              ELEMENT_START_POSITION,
            ) -
            DESCRIPTIONS_INDENTATION / 2
          }`}
          stroke={LINE_COLOR}
          strokeWidth={LINE_WIDTH}
          fill="transparent"
        />
        {data.map((element, elementIndex) => {
          const absoluteX = elementWidths.reduce(
            (accumulator, currentValue, i) =>
              i < elementIndex ? accumulator + currentValue : accumulator,
            ELEMENT_START_POSITION,
          );
          const absoluteY =
            elementIndex % 2 === 0
              ? (maxEvenDescriptionsLength - element.descriptions.length) *
                DESCRIPTION_TOTAL_HEIGHT
              : maxEvenDescriptionsLength * DESCRIPTION_TOTAL_HEIGHT +
                DESCRIPTION_HEIGHT +
                LINE_MARGIN;
          return (
            <g key={elementIndex}>
              <circle
                cx={absoluteX - DESCRIPTIONS_INDENTATION / 2}
                cy={lineY}
                r={CIRCLE_R}
                fill={LINE_COLOR}
              ></circle>
              <path
                d={`M ${absoluteX - DESCRIPTIONS_INDENTATION / 2} ${lineY} C ${
                  absoluteX - DESCRIPTIONS_INDENTATION / 2
                } ${lineY}, ${absoluteX - DESCRIPTIONS_INDENTATION / 2} ${
                  absoluteY + DESCRIPTION_HEIGHT / 2
                }, ${absoluteX} ${absoluteY + DESCRIPTION_HEIGHT / 2}`}
                stroke={LINE_COLOR}
                strokeWidth={LINE_WIDTH}
                fill="transparent"
              />
              <Element
                key={elementIndex}
                i={elementIndex}
                title={element.title}
                descriptions={element.descriptions}
                elementWidths={elementWidths}
                setElementWidths={setElementWidths}
                maxEvenDescriptionsLength={maxEvenDescriptionsLength}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
