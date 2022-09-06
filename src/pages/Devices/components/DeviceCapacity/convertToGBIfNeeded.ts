import CurrentMax from './CurrentMax';

const convertToGBIfNeeded = (current: number, max: number): CurrentMax =>
    current < 1024 && max < 1024
        ? {
              current: Number(current.toFixed(2)),
              max: Number(max.toFixed(2)),
              unit: 'MB',
          }
        : {
              current: Number((current / 1024).toFixed(2)),
              max: Number((max / 1024).toFixed(2)),
              unit: 'GB',
          };

export default convertToGBIfNeeded;
