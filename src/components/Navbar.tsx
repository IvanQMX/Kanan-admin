import React from "react";
import { NavLink } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ReactComponent as Logo } from "../svg/logo.svg";
import { ReactComponent as HorizontalLogo } from "../svg/horizontal.svg";

const navigation = [{ name: "Reportes", href: "/reportes" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="sticky top-0 bg-blue-500">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <NavLink to="/">
                    <Logo className="block sm:hidden h-12 w-auto fill-white" />
                    <HorizontalLogo className="hidden sm:block h-6 w-auto fill-white" />
                  </NavLink>
                </div>
                  <div className="hidden sm:flex sm:ml-6 sm:items-center">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive ? "bg-blue-600" : "hover:bg-blue-400",
                              "text-white px-3 py-2 rounded-md text-sm font-medium"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-100 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
