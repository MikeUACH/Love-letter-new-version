export type Memory = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  image?: string | undefined; // e.g. "/memories/primera-cita.jpg" (put the file in public/memories/)
};

// Add your memories here. Photos go in the public/memories/ folder.
// (Descriptions are empty for now — add them whenever you want!)
export const memories: Memory[] = [
  {
    id: "primera-cita",
    title: "Nuestra primera cita",
    date: "2026-08-14",
    description: "El primer día que salimos después de tanto tiempo. Recuerdo que estabas peleándote con tu amigo por lo de su novia y, cuando la situación se puso complicada, me llamaste. Fui por ti y nos quedamos un rato muy a gusto en mi carro. Hablamos de muchas cosas, pero la que más recuerdo fue el sueño que había tenido contigo. Te lo conté ahí mismo, en ese momento, y después nos besamos. La verdad, fue algo muy intenso y especial. Es uno de esos momentos que se quedan grabados para siempre.",
    image: "/memories/primera-cita.jpg",
  },
  {
    id: "kanpai-comer",
    title: "Nuestra primera cena juntos",
    date: "2026-08-21",
    description: "Recuerdo que estuve como loco buscando lugares para llevarte hasta que platiqué con algunos compañeros del trabajo y me recomendaron este. Todavía recuerdo verte por la ventana del carro mientras íbamos de camino y sentirme afortunado de poder compartir ese momento contigo. Después de cenar tuvimos una conversación algo triste, pero para mí fue muy importante. Yo ya tenía claro que quería estar contigo y estaba dispuesto a aceptar cualquier respuesta. Aun así, no pensaba rendirme tan fácil. Eres la persona con la que quiero estar y eso era lo único que realmente importaba. Me alegra muchísimo que hayas aceptado salir conmigo ese día, porque terminó convirtiéndose en uno de los recuerdos más especiales que guardo de nosotros.",
    image: "/memories/kanpai-comer.jpg",
  },
  {
    id: "arete",
    title: "El arete que me prestaste el dia del cumpleaños de la amiga de Sara",
    date: "2026-08-17",
    description: "Días antes te había llevado al centro porque querías comprar ropa para tu cumpleaños y para un festejo al que también pensabas asistir. Ese día compraste esos aretes que tanto te gustaron. Cuando llegó la fiesta, los llevabas puestos y me diste uno para que los dos estuviéramos combinados. Desde entonces lo he guardado en mi mochila del trabajo y nunca ha salido de ahí. Me encantó ese detalle. Fue especial para mí porque me compartiste algo que te gustaba y que habías elegido para ti. Me hizo sentir importante, querido y muy especial.",
    image: "/memories/arete.jpg",
  },
  {
    id: "lentes-recuperados",
    title: "Dias despues de tu cumpleaños",
    date: "2026-08-31",
    description: "Después de tu cumpleaños y de salir de la granja nos dimos cuenta de que habías perdido tus lentes. Recuerdo haberte preguntado si querías que regresáramos, pero me dijiste que no y que no me preocupara. Aun así, en mi cabeza solo pensaba en hacer todo lo posible por recuperarlos. Cuando llegué a mi casa comencé a buscar a los dueños de la granja, y durante todo el fin de semana estuve intentando localizarlos. Finalmente llegó el lunes y pude ir por ellos después del trabajo. Recuerdo la felicidad que sentí cuando los encontré y las ganas que tenía de verte para entregártelos. Quería ver tu sonrisa y saber que habías recuperado algo importante para ti. Me dio mucha satisfacción poder ayudarte. Te amo muchísimo y me alegra poder hacer cosas por ti, porque lo que más quiero es verte feliz y saber que, aunque sea un poquito, también puedo contribuir a esa felicidad.",
    image: "/memories/lentes-recuperados.jpg",
  },
  {
    id: "cita-en-mi-casa",
    title: "Cena en casa de Mike",
    date: "2026-09-04",
    description: "Llevaba varios días planeando hacer algo especial por tu cumpleaños. Estaba muy nervioso de proponerte la idea porque iba a ser la primera vez que irías a mi casa y, sobre todo, porque no sabía si te iba a gustar lo que pensaba cocinar. Cuando me dijiste que sí, me emocioné muchísimo. Recuerdo que esa tarde me acompañaste a comprar todo: las flores, la carne y el romero. Después te llevé a tu casa y corrí a la mía. Tenía que limpiar porque mis papás estaban de viaje y la casa era un desastre. Limpié como pude, me bañé rápido y fui por ti. Más tarde cenamos juntos y compartimos vino mientras sonaba Entombed de Deftones. Recuerdo explicarte que la canción habla de un amor tan intenso que parece envolverte por completo, y te lo conté porque así me sentía contigo. Después pusiste algunas canciones de tu época más rockera, vimos películas y disfrutamos la noche juntos. Al día siguiente tenías que ir a la escuela, así que te fuiste temprano. Te entregué las flores y fue justo en ese momento cuando nos tomamos esta foto. Me encanta tanto que hasta la puse en mi reloj.",
    image: "/memories/cita-en-mi-casa.jpg",
  },
  {
    id: "otra-cita-uwu",
    title: "...",
    date: "2026-09-11",
    description: "Otra de las veces en las que agarras mi telefono y te tomas una foto, y otro dia que salimos los dos, te amo mucho amor, no todo el tiempo hace falta contar una historia para recordar esos momentos, la historia se cuenta sola con la imagen ;)",
    image: "/memories/otra-cita-uwu.jpg",
  },
  {
    id: "mucho-trabajo",
    title: "Dia con mucho trabajo",
    date: "2026-09-30",
    description: "Ese día sabías que ibas a salir tarde del trabajo debido a un pendiente importante. Yo tenía entendido que saldrías alrededor de las 7:30, así que llegué desde esa hora para que no tuvieras que esperarme al terminar. Al final saliste un poco más tarde, pero en cuanto te vi me puse feliz, como siempre. Salimos, platicamos un rato, llevamos a tu compañera y todo salió muy bien. También me compraste unas papas ese día. Puede parecer algo sencillo, pero las disfruté muchísimo, sobre todo porque venían de ti. Tienes una forma muy especial de hacerme sentir querido y especial, incluso en los detalles más pequeños.",
    image: "/memories/mucho-trabajo.jpg",
  },
  {
    id: "primer-dia-novios",
    title: "Nuestro primer día de novios",
    date: "2026-10-03",
    description: "No tengo una foto exacta de ese día, pero sí tengo el recuerdo de la fecha en la que decidimos hacer oficial lo que somos ahora. Es una fecha muy especial para mí. A veces me da un poco de tristeza no haber tomado una fotografía ese día, pero por eso elegí esta imagen. La tomé cuando fui a correr y no dejaba de pensar en ti. Recuerdo perfectamente que, en ese momento, lo único que quería era estar contigo.",
    image: "/memories/primer-dia-novios.jpg",
  },
  {
    id: "wendys",
    title: "Wendy's :D",
    date: "2026-10-10",
    description: "Quise guardar este momento porque ese día fuimos a Wendy's y, de cierta forma, me recuerda cómo comenzaron muchas cosas entre nosotros. El 15 de agosto te llevé algo de desayunar porque, además de que te hice desvelarte la noche anterior, todavía tenías que ir a la escuela y no habías comido nada. Quería cuidarte un poquito y compartir contigo algo que siempre me ha gustado. Esta foto representa eso y mucho más. Representa todos esos pequeños momentos que hemos compartido. Estar contigo es de las cosas más bonitas que me han pasado y que sé que seguirán haciendo feliz mi vida.",
    image: "/memories/wendys.jpg",
  },
  {
    id: "concierto-pulseras-y-mas",
    title: "Concierto, pulseras y más",
    date: "2026-10-17",
    description: "Fue un día increíble y también una gran idea compartir ese regalo contigo. Tal vez no tengamos exactamente la misma pulsera, pero lo que representa para nosotros tiene un valor enorme. Es uno de esos detalles que siempre voy a recordar porque está lleno de significado. Quiero seguir acumulando recuerdos contigo, tener más detalles, más aventuras y más días a tu lado. Pero, sobre todo, quiero seguir compartiéndolos contigo. Te amo, corazón.",
    image: "/memories/concierto-pulseras-y-mas.jpg",
  },
  {
    id: "desayuno-rico",
    title: "...",
    date: "2026-10-18",
    description: "Después del concierto, las pulseras y de disfrutar nuestra estadía juntos, fuimos a desayunar a un lugar que nos encantó. Espero que volvamos algún día, porque no solo estaba bonito o se comía rico; siento que ahora guarda un significado especial para nosotros. Me encanta cuando los lugares dejan de ser solo lugares y se convierten en recuerdos.",
    image: "/memories/desayuno-rico.jpg",
  },
  {
    id: "campo-flores",
    title: "...",
    date: "2026-10-18",
    description: "El día todavía no terminaba después del desayuno. Más tarde fuimos a un campo lleno de flores y nos tomamos algunas fotos muy bonitas. Sin embargo, lo más hermoso que vi ese día no fueron las flores ni el paisaje, fuiste tú. Compartir este tipo de experiencias contigo se siente como magia. Son momentos sencillos, pero cuando estoy contigo se convierten en recuerdos que quiero guardar para siempre.",
    image: "/memories/campo-flores.jpg",
  },
];

export function sortMemories(list: Memory[]) {
  return [...list].sort((a, b) => a.date.localeCompare(b.date));
}

export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}
