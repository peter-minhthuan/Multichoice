import { ApiProperty } from "@nestjs/swagger"

export class CreatAnswer {
    @ApiProperty()
    content: string

    @ApiProperty({ default: false })
    isCorrect: boolean
}