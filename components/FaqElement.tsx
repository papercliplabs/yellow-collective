import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function FaqElement({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex flex-row justify-between md:hover:bg-secondary md:p-4 rounded-2xl items-center text-start">
            <h3>{title}</h3>
            <ChevronDownIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-8 transition ease-in-out text-skin-base shrink-0`}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="text-secondary md:px-4 flex flex-col gap-4">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
