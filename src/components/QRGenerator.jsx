import React, { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { toPng } from "html-to-image";

export default function QRGenerator() {
  const [url, setUrl] = useState("https://rebaorg.vercel.app/");
  const [size, setSize] = useState(256);
  const [isTransparent, setIsTransparent] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fgColor, setFgColor] = useState("#000000");
  const [logo, setLogo] = useState(null);
  const [logoWidth, setLogoWidth] = useState(50);
  const [logoHeight, setLogoHeigth] = useState(50);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [logoRadius, setLogoRadius] = useState(0);
  const [eyeRadius, setEyeRadius] = useState(10);
  const [eyeColor, setEyeColor] = useState("#023060");

  const qrRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current, {
        backgroundColor: isTransparent ? "transparent" : "white",
      });
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();
    }
  };

  // Configure eye radius for all corners
  const eyeRadiusConfig = [
    {
      outer: [eyeRadius, eyeRadius, 0, eyeRadius],
      inner: [0, eyeRadius, eyeRadius, eyeRadius],
    },
    [eyeRadius, eyeRadius, eyeRadius, 0],
    [eyeRadius, 0, eyeRadius, eyeRadius],
  ];

  // Configure eye colors for all eyes
  const eyeColorConfig = [eyeColor, eyeColor, eyeColor];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-6">
        <div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            URL:
          </label>
          <input
            type="text"
            value={url}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Tamaño:
            </label>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              min="128"
              max="512"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {size}px
            </span>
          </div>
          <div>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Esquinas redondeadas:
            </label>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              min="0"
              max="50"
              value={eyeRadius}
              onChange={(e) => setEyeRadius(Number(e.target.value))}
            />
            <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {eyeRadius}px
            </span>
          </div>
        </div>

        <div
          className={
            isTransparent ? "grid grid-cols-3 gap-4" : "grid grid-cols-2 gap-4"
          }
        >
          <div>
            <input
              type="checkbox"
              checked={isTransparent}
              onChange={(e) => setIsTransparent(e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Fondo Transparente
            </label>
          </div>

          {!isTransparent && (
            <div>
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                Color de Fondo:
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Color del QR:
            </label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
            />
          </div>

          <div>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Color de esquinas:
            </label>
            <input
              type="color"
              value={eyeColor}
              onChange={(e) => setEyeColor(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Logo:
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            onChange={handleLogoChange}
          />
        </div>
        {logo && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Logo Ancho:
                </label>
                <input
                  type="range"
                  min="20"
                  max="300"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  value={logoWidth}
                  onChange={(e) => setLogoWidth(Number(e.target.value))}
                />
                <span>{logoWidth}px</span>
              </div>
              <div>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Logo Alto:
                </label>
                <input
                  type="range"
                  min="20"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  max="300"
                  value={logoHeight}
                  onChange={(e) => setLogoHeigth(Number(e.target.value))}
                />
                <span>{logoHeight}px</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Opacidad del logo:
                </label>
                <input
                  type="range"
                  min="0"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  max="1"
                  step="0.1"
                  value={logoOpacity}
                  onChange={(e) => setLogoOpacity(Number(e.target.value))}
                />
                <span>{logoOpacity * 100}%</span>
              </div>
              <div>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Redondear logo:
                </label>
                <input
                  type="range"
                  min="0"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  max="50"
                  value={logoRadius}
                  onChange={(e) => setLogoRadius(Number(e.target.value))}
                />
                <span>{logoRadius}px</span>
              </div>
            </div>
          </>
        )}
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={downloadQR}
        >
          Descargar Codigo QR
        </button>
      </div>

      <div
        ref={qrRef}
        className="flex items-center justify-center h-[600px]"
        style={{ background: isTransparent ? "transparent" : "white" }}
      >
        <QRCode
          value={url}
          ecLevel="H"
          size={size}
          bgColor={isTransparent ? "transparent" : bgColor}
          fgColor={fgColor}
          qrStyle="dots"
          eyeRadius={eyeRadiusConfig}
          eyeColor={eyeColorConfig}
          quietZone={10}
          logoImage={logo || undefined}
          logoWidth={logoWidth}
          logoHeight={logoHeight}
          logoOpacity={logoOpacity}
          logoBorderRadius={logoRadius}
          removeQrCodeBehindLogo={false}
        />
      </div>
    </div>
  );
}
