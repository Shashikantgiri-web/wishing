"use client";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';


export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const username = user.username;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const birthday = user.birthday; // Date of birth (if available)
  return (
    <>
      <nav className="flex justify-end items-center p-4 gap-4 h-16">
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>

      <div>
      <p>Username: {username}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Birthday: {birthday ? birthday.toDateString() : 'N/A'}</p>
    </div>
    </>
  );
}
