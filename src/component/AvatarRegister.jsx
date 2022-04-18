import { Avatar, AvatarGroup, useBreakpointValue } from "@chakra-ui/react";

const AvatarRegister = () => {
  return (
    <>
      <AvatarGroup>
        <Avatar
          name="Naruto"
          src="https://www.looper.com/img/gallery/what-fans-dont-understand-about-narutos-tailed-beast-form/intro-1638746701.jpg"
          size={useBreakpointValue({ base: "md", md: "lg" })}
          position="relative"
          zIndex={2}
          _before={{
            content: '""',
            width: "full",
            height: "full",
            rounded: "full",
            transform: "scale(1.125)",
            bgGradient: "linear(to-bl, green.400, blue.400)",
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
          }}
        />
        <Avatar
          name="Luffy"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da3400f2-9687-4649-9348-c280595c520c/d5fsath-330ac945-0b30-40b4-b149-bea203f53501.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhMzQwMGYyLTk2ODctNDY0OS05MzQ4LWMyODA1OTVjNTIwY1wvZDVmc2F0aC0zMzBhYzk0NS0wYjMwLTQwYjQtYjE0OS1iZWEyMDNmNTM1MDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EmwxgX9bmV8QntXIp2pz5enmfmgE0zCbZSDZ7Pwxy7k"
          size={useBreakpointValue({ base: "md", md: "lg" })}
          position="relative"
          zIndex={2}
          _before={{
            content: '""',
            width: "full",
            height: "full",
            rounded: "full",
            transform: "scale(1.125)",
            bgGradient: "linear(to-bl, green.400, blue.400)",
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
          }}
        />
        <Avatar
          name="Doraemon"
          src="https://en.siakapkeli.my/wp-content/uploads/2021/11/Doraemon-Wiki-Fandom.png"
          size={useBreakpointValue({ base: "md", md: "lg" })}
          position="relative"
          zIndex={2}
          _before={{
            content: '""',
            width: "full",
            height: "full",
            rounded: "full",
            transform: "scale(1.125)",
            bgGradient: "linear(to-bl, green.400, blue.400)",
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
          }}
        />
        <Avatar
          name="Goku"
          src="https://pbs.twimg.com/media/EOCY9e2UYAAmtey.jpg"
          size={useBreakpointValue({ base: "md", md: "lg" })}
          position="relative"
          zIndex={2}
          _before={{
            content: '""',
            width: "full",
            height: "full",
            rounded: "full",
            transform: "scale(1.125)",
            bgGradient: "linear(to-bl, green.400, blue.400)",
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
          }}
        />
        <Avatar
          name="Konan"
          src="https://i.redd.it/s0xg348cr7k31.png"
          size={useBreakpointValue({ base: "md", md: "lg" })}
          position="relative"
          zIndex={2}
          _before={{
            content: '""',
            width: "full",
            height: "full",
            rounded: "full",
            transform: "scale(1.125)",
            bgGradient: "linear(to-bl, green.400, blue.400)",
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
          }}
        />
      </AvatarGroup>
    </>
  );
};

export default AvatarRegister;
