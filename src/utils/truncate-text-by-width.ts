/**
 * 음절 단위의 개행 시 사용할 수 있는 말줄임 함수
 * 단어 단위로 개행 방식 변경 시, 로직 변경이 필요
 */

export const truncateTextByWidth = (
  targetElement: HTMLElement,
  suffix: string,
  maxWidth: number,
  lines: number
) => {
  // 1. 임시 캔버스 생성
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return null;

  // 2. 스타일 추가
  const style = window.getComputedStyle(targetElement);
  context.font = `${style.fontSize}/${style.lineHeight} ${style.fontFamily}`;

  // 3. 크기 비교
  const originText = targetElement.innerText;
  const originWidth = context.measureText(originText).width;
  const suffixWidth = Math.ceil(context.measureText(suffix).width);
  // 띄워쓰기로 인해 불필요한 공백이 생길 수 있기에 비교할 때 추가
  const spaceWidth = Math.ceil(context.measureText(" ").width * 2);

  if (originWidth <= maxWidth * lines) return null;

  // 4. 자를 위치를 찾기 위해 이분 탐색 진행
  const textList = [];

  let slicePos = 0;
  for (let i = 0; i < lines; i += 1) {
    let start = slicePos;
    let end = originText.length;

    // suffix를 붙여야하는 라인인 경우
    if (i === lines - 1) {
      while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        const slicedText = targetElement.innerText.slice(slicePos, mid);
        const slicedTextWidth = Math.ceil(
          context.measureText(slicedText).width
        );

        if (slicedTextWidth + suffixWidth + spaceWidth < maxWidth)
          start = mid + 1;
        else if (slicedTextWidth + suffixWidth + spaceWidth >= maxWidth)
          end = mid - 1;
      }

      textList.push(targetElement.innerText.slice(slicePos, end) + suffix);
    }
    // 길이만 비교하면 되는 경우
    else {
      while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        const slicedText = targetElement.innerText.slice(slicePos, mid);
        const slicedTextWidth = Math.ceil(
          context.measureText(slicedText).width
        );

        if (slicedTextWidth + spaceWidth < maxWidth) start = mid + 1;
        else if (slicedTextWidth + spaceWidth >= maxWidth) end = mid - 1;
      }

      textList.push(targetElement.innerText.slice(slicePos, end));
      slicePos = end;
    }
  }

  return textList;
};
