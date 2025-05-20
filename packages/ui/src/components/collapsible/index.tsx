import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import React from 'react';

const Collapsible = (
  props: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
) => <CollapsiblePrimitive.Root data-testid="collapsible-root" {...props} />;
Collapsible.displayName = 'Collapsible';

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
