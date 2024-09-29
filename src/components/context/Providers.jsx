import AuthProvider from "./AuthProvider";
import BookmarksProvider from "./BookmarksProvider";
import HotelsProvider from "./HotelsProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <HotelsProvider>
        <BookmarksProvider>{children}</BookmarksProvider>
      </HotelsProvider>
    </AuthProvider>
  );
}
