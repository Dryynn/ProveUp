export function Dropdown() {
    return (
    <select defaultValue="opcao1" className="w-full text-white bg-transparent border-2 border-proveup-orange rounded-xl px-4 py-2 placeholder-white/70 hover:placeholder-transparent placeholder:transition-all placeholder:duration-250 focus:outline-hidden">
      <option value="opcao1" className="bg-zinc-900 text-white">Engenharia de Software</option>
    </select>
  );
}