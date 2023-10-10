import { Skeleton } from 'antd';
import { SkeletonInputProps } from 'antd/es/skeleton/Input';

type SkeletonInFormProps = {
  numberOfSkeletons: number;
  styles?: SkeletonInputProps;
  typeOfSkeleton: 'input' | 'avatar';
};

export default function SkeletonInForm({ numberOfSkeletons, typeOfSkeleton, styles }: SkeletonInFormProps) {
  return typeOfSkeleton === 'input' ? (
    [...Array(numberOfSkeletons)].map((event, index) => {
      return <Skeleton.Input {...styles} />;
    })
  ) : typeOfSkeleton === 'avatar' ? (
    [...Array(numberOfSkeletons)].map((event, index) => {
      return <Skeleton.Input {...styles} />;
    })
  ) : (
    <></>
  );
}
