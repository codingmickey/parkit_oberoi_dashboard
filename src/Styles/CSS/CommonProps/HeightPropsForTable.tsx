export default function HeightPropsForTable(height: number): number {
  const y = height < 569 ? 315 : height >= 569 && height < 640 ? 350 : height >= 640 && height < 768 ? 405 : 520;
  return y;
}
