/**
 * NOTE panneullum is not a module so it pollutes window object
 * it should only be imported and instantiated once
 */
import "pannellum/src/js/pannellum";
import "pannellum/src/js/libpannellum";
import "pannellum/src/css/pannellum.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pannellum = (window as any).pannellum;

