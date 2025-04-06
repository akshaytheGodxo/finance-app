import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/app/_components/globals/accordion";

const AccordionSection = () => {
    return (
        <div className="bg-[#1a1a1a] flex flex-col items-center justify-center p-4 ">
            <div className="w-full max-w-[74rem] h-px bg-white opacity-20 mb-8" />
            <h2 className="font-poppins font-semibold text-4xl text-white text-center mb-6 text-4xl">FAQ's</h2>
            <div className="w-full max-w-lg">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How does it work?</AccordionTrigger>
                        <AccordionContent>
                            Click on a section to expand or collapse the content.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it customizable?</AccordionTrigger>
                        <AccordionContent>
                            Yes. You can modify styles and behavior as needed.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default AccordionSection;
