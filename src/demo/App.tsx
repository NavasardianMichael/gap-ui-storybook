import { Fragment, useState } from 'react';
import './App.css';
import '@navasardianmichael/gap-ui-storybook/fonts/CentraNo2/kit.css';
import '@navasardianmichael/gap-ui-storybook/fonts/ChronicleDisplay/kit.css';
import { CENTRA_NO2_FONT_TEMPLATE, CHRONICLE_DISPLAY_FONT_TEMPLATE } from './constants/fonts';

const App = () => {
  const [fontSize, setFontSize] = useState(16);
  const [chronicleDisplayCommonText, setChronicleDisplayCommonText] =
    useState('');
  const [centraNo2CommonText, setCentraNo2CommonText] = useState('');

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="font-bold text-6xl text-center">GAP UI Storybook</h1>
      <hr />
      <div className="flex flex-col gap-4 gap-ui-kit_font-chronicle-display">
        <h2 className="text-5xl">Chronicle Display</h2>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-8 w-1/3">
            <div className="w-full">
              <label className="block mb-2 text-sm">
                Custom Chronicle Display Text:
              </label>
              <input
                value={chronicleDisplayCommonText}
                onChange={(e) => setChronicleDisplayCommonText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 grow rounded-sm">
            {CHRONICLE_DISPLAY_FONT_TEMPLATE.map((font, i, arr) => (
              <Fragment key={font.label}>
                <div
                  className="flex gap-2 flex-wrap"
                  style={{
                    fontWeight: font.fontWeight,
                    fontStyle: font.fontStyle,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  <p> {chronicleDisplayCommonText || font.label}</p>
                  <div className="ml-auto flex gap-1.5">
                    <p>weight: {font.fontWeight},</p>
                    <p>style: {font.fontStyle}</p>
                  </div>
                </div>
                {i !== arr.length - 1 && <hr />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4 gap-ui-kit_font-centra-no2">
        <h2 className="text-5xl">Centra No2</h2>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-8 w-1/3">
            <div className="w-full">
              <label className="block mb-2 text-sm">
                Custom Centra No2 Text:
              </label>
              <input
                value={centraNo2CommonText}
                onChange={(e) => setCentraNo2CommonText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-4 grow rounded-sm">
            {CENTRA_NO2_FONT_TEMPLATE.map((font, i, arr) => (
              <Fragment key={font.label}>
                <div
                  className="flex gap-2 flex-wrap"
                  style={{
                    fontWeight: font.fontWeight,
                    fontStyle: font.fontStyle,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  <p>{centraNo2CommonText || font.label}</p>
                  <div className="ml-auto flex gap-1.5">
                    <p>weight: {font.fontWeight},</p>
                    <p>style: {font.fontStyle}</p>
                  </div>
                </div>
                {i !== arr.length - 1 && <hr />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
