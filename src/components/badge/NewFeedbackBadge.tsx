import { type ComponentProps } from 'react';

import Badge from './Badge';

type BadgeProps = ComponentProps<typeof Badge>;
type BadgePropsWithoutChildren = Omit<BadgeProps, 'children'>;

interface Props extends BadgePropsWithoutChildren {
  newFeedbackCount: number;
}

const NewFeedbackBadge = ({ newFeedbackCount, ...rest }: Props) => {
  const maximizedCount = newFeedbackCount > 99 ? 99 : newFeedbackCount;

  return <Badge {...rest}>+{maximizedCount}</Badge>;
};

export default NewFeedbackBadge;
