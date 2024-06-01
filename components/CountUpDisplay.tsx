import { useCallback, useEffect, useState, Fragment } from "react";

export type CountUpDisplayProps = {
  from?: number | string;
  to: number | string;
};

function getNumber(time: number | string) {
  if (typeof time === "string") {
    return new Date(time).getTime() / 1000;
  }
  return time;
}

export const TimeDisplayMap = {
  m: "minute",
  s: "second",
};

export const splitDurationSegments = (difference: number) => ({
  m: Math.floor((difference / 60)),
  s: Math.floor(difference % 60),
});

const getTimeLeft = (from?: number, to?: number) => {
  if (from === undefined) {
    return null;
  }
  let difference = (from ?? 0) - (to ?? 0);

  if (difference < 0) {
    difference = 0;
  }

  return splitDurationSegments(difference);
};


export const DurationDisplay = ({ duration }: { duration: number }) => {
  const renderSegmentText = (
    segmentName: keyof typeof splitDurationSegments,
    segmentValue: number
  ) => {
    if (segmentValue === 0) {
      return "";
    }
    if (segmentValue === 1) {
      return `${segmentValue} ${TimeDisplayMap[segmentName]}`;
    }
    return `${segmentValue} ${TimeDisplayMap[segmentName]}s`;
  };
  const durationSegments = splitDurationSegments(duration);
  const singleSegment = Object.values(durationSegments)
    .map((segment) => segment === 0)
    .reduce((last, now) => last + (now ? 0 : 1), 0);
  if (singleSegment <= 1) {
    return (
      <Fragment>
        {Object.keys(durationSegments)
          .map((segment: string) =>
            // @ts-ignore: ignoring due to key type erasure with string
            renderSegmentText(segment, durationSegments[segment])
          )
          .join("")}
      </Fragment>
    );
  }
  return <CountUpDisplay from={0} to={duration} />;
};

export const CountUpDisplay: React.FC<CountUpDisplayProps> = (
  props: CountUpDisplayProps
) => {
  const [timeLeft, setTimeLeft] = useState<{
    m: number;
    s: number;
  } | null>(
    getTimeLeft(
      getNumber(props.from === undefined ? new Date().getTime() / 1000 : props.from),
      getNumber(props.to)
    )
  );
  const updateTimeLeft = useCallback(() => {
    setTimeLeft(
      getTimeLeft(
        getNumber(props.from === undefined ? new Date().getTime() / 1000 : props.from),
        getNumber(props.to)
      )
    );
  }, [props.from, props.to]);

  useEffect(() => {
    const checkTimeout = setInterval(updateTimeLeft, 1000);
    return () => {
      clearInterval(checkTimeout);
    };
  }, [updateTimeLeft]);

  if (!timeLeft) {
    return <Fragment />;
  }

  const minutes = timeLeft.m;
  const seconds = timeLeft.s;

  let timeString = "";
  if (minutes >= 90) {
    timeString = `90:00 + ${minutes - 90}'`;
  } else {
    timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return <h3>{timeString || "0s"}</h3>;
};
