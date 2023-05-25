import type { NextPage } from "next";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { debounce } from "lodash";
import { Project } from "../interfaces/Project";

interface SearchProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

const Search: FC<SearchProps> = ({ selectedProject, setSelectedProject }) => {
  const [query, setQuery] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);

  // Log when selectedProject changes
  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `https://juicebox.money/api/projects?text=${query}`
      );
      let data: Project[] = await response.json();
      // Filter out projects with pv: '1'
      data = data.filter((project) => project.pv !== "1");
      setProjects(data.slice(0, 5));
    };

    if (query !== "") {
      const debouncedFetch = debounce(fetchProjects, 250);
      debouncedFetch();
    } else {
      setProjects([]);
    }
  }, [query]);

  const filteredProjects =
    query === ""
      ? []
      : projects.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="">
      <Combobox as="div" value={selectedProject} onChange={setSelectedProject}>
        <div className="relative my-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(project: Project | null) =>
              project?.name || "Juicebox"
            }
            onFocus={(event) => event.target.select()}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          </Combobox.Button>

          {filteredProjects.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredProjects.map((project) => (
                <Combobox.Option
                  key={project.id}
                  value={project}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-8 pr-4",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {project.name}{" "}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 left-0 flex items-center pl-1.5",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default Search;
