import { useState } from "react";
import Input from "../shared/Input";
import Botao from "../shared/Botao";
import { IconPlus } from "@tabler/icons-react";
import TagExcluivel from "./TagExcluivel";

interface InputTagsProps {
	tags: string[];
	setTags: (tags: string[]) => void;
}

export default function InputTags({ tags, setTags }: InputTagsProps) {
	const [textoTag, setTextoTag] = useState("");
	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex">
				<Input
					texto="Conteúdo da Tag"
					valor={textoTag}
					setValor={setTextoTag}
					className="w-full"
				/>
				<Botao
					onClick={() => {
						if (tags.includes(textoTag.trim())) {
							return;
						}
						setTags([...tags, textoTag.trim()]);
						setTextoTag("");
					}}
					className="mx-2 self-end h-10 rounded-md"
				>
					<IconPlus />
				</Botao>
			</div>
			<div className="flex gap-2 my-2 flex-wrap">
				{tags.map((tag, indice) => {
					return (
						<TagExcluivel
							texto={tag}
							key={indice}
							onDelete={() => {
								setTags(tags.filter((_, i) => i !== indice));
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}
