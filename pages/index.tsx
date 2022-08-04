import { useState, useRef, useEffect } from "react";
import generator from "generate-password";
import type { NextPage } from "next";
import ClipboardJS from "clipboard";
import Head from "next/head";

const MAX_RANGE: number = 100;
const MIN_RANGE: number = 4;

enum Options {
  MIXED_CASE = "mixed_case",
  NUMBERS = "numbers",
  SPECIAL_CHARACTER = "special_character",
  START_WITH_ALPHABET = "start_with_alphabet",
}

const Home: NextPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [generateButtonText, setGenerateButtonText] =
    useState<string>("Copy Password");
  const [password, setPassword] = useState<string>("");
  const [passwordLen, setPasswordLen] = useState<number>(16);

  const getRangeCss = (rangeValue: number): string => {
    const rangePercent = (rangeValue / MAX_RANGE) * 100;
    return `
      .form-range::-webkit-slider-runnable-track {
        height: 0.25rem;
        background: linear-gradient(to right, #3264fe ${rangePercent}%, #d5d5d5 ${rangePercent}%)
      }
      .form-range::-webkit-slider-thumb {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: -0.55rem;
      }
    `;
  };

  const [rangeCss, setRangeCss] = useState<string>(getRangeCss(passwordLen));

  const [generatorOption, setGeneratorOption] =
    useState<generator.GenerateOptions>({
      length: 16,
      symbols: true,
      numbers: true,
      uppercase: true,
      lowercase: true,
      excludeSimilarCharacters: true,
      exclude: "",
    });

  const passwordLengthHandle = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setRangeCss(getRangeCss(+value));
    setGeneratorOption({
      ...generatorOption,
      length: +value,
    });
  };

  const optionHandle = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, checked } = e.currentTarget;
    switch (name) {
      case Options.MIXED_CASE:
        setGeneratorOption({
          ...generatorOption,
          uppercase: checked,
        });
        break;
      case Options.NUMBERS:
        setGeneratorOption({
          ...generatorOption,
          numbers: checked,
        });
        break;
      case Options.SPECIAL_CHARACTER:
        setGeneratorOption({
          ...generatorOption,
          symbols: checked,
        });
        break;
      default:
        break;
    }
  };

  const generateHandle = (): void => {
    setPassword(generator.generate(generatorOption));
  };

  const focusHandle = (): void => {
    passwordRef.current?.select();
  };

  const copyHandle = (): void => {
    new ClipboardJS(".btn-copy-password", {
      text: (): string => {
        setGenerateButtonText("Copiled");
        setTimeout(() => {
          setGenerateButtonText("Copy Password");
        }, 2000);
        return password;
      },
    });
  };

  useEffect(() => {
    setPassword(generator.generate(generatorOption));
  }, [generatorOption]);

  return (
    <>
      <div className="container py-10">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Strong Random Password Generator</h1>
          </div>
        </div>
        <div className="row mt-10 mb-3">
          <div className="col-12 col-xxl-5 col-xl-6 col-lg-7 col-md-10 col-sm-12 mx-auto">
            <style>{rangeCss}</style>
            <input
              type="range"
              className="form-range"
              min={MIN_RANGE}
              max={MAX_RANGE}
              defaultValue={16}
              onChange={passwordLengthHandle}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-xxl-6 col-xl-7 col-lg-8 col-md-12 col-sm-12 mx-auto ">
            <div className="mt-10">
              <div className="input-group input-group-inline">
                <input
                  type="text"
                  className="form-control form-control-lg text-lg"
                  value={password}
                  onFocus={focusHandle}
                  ref={passwordRef}
                />
                <span
                  className="input-group-text cursor-pointer px-4"
                  onClick={generateHandle}
                >
                  <i className="bi bi-arrow-clockwise text-xl"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-auto">
              <div className="form-check">
                <input
                  className="form-check-input w-5 h-5"
                  type="checkbox"
                  name={Options.MIXED_CASE}
                  checked={
                    generatorOption.lowercase && generatorOption.uppercase
                  }
                  onChange={optionHandle}
                />
                <label className="form-check-label ms-2 mt-1">Mixed Case</label>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-check">
                <input
                  className="form-check-input w-5 h-5"
                  type="checkbox"
                  name={Options.SPECIAL_CHARACTER}
                  checked={Boolean(generatorOption.symbols)}
                  onChange={optionHandle}
                />
                <label className="form-check-label ms-2 mt-1">
                  Special Character
                </label>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-check">
                <input
                  className="form-check-input w-5 h-5"
                  type="checkbox"
                  name={Options.NUMBERS}
                  checked={generatorOption.numbers}
                  onChange={optionHandle}
                />
                <label className="form-check-label ms-2 mt-1">Numbers</label>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <button
              type="button"
              className="btn btn-primary btn-copy-password"
              onClick={copyHandle}
            >
              {generateButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
