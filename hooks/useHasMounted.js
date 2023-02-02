import React from "react";

/* 
  When you need to know the React page has mounted, use this hook.
  https://www.joshwcomeau.com/snippets/react-hooks/use-has-mounted/
*/

export function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
