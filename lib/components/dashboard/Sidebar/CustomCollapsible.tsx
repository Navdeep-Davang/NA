// lib/components/dashboard/Sidebar/CustomCollapsible.tsx

"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const CustomCollapsible = ({
    children,
    trigger,
    defaultOpen = false,
}: {
    children: React.ReactNode;
    trigger: React.ReactNode;
    defaultOpen?: boolean;
}) => {
    return (
            <Accordion type="single" collapsible defaultValue={defaultOpen ? "item-1" : undefined}>
                <AccordionItem value="item-1" >
                    <AccordionTrigger className="accordion-trigger pl-2">{trigger}</AccordionTrigger>
                    <AccordionContent className="pl-2 text-base">
                        {children}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
};

export default CustomCollapsible;
