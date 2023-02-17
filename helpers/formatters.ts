export const booleanToString = (value: boolean) => (value ? 'Sim' : 'Não')

export const arrayToNaturalLanguage = (value: string[]) => new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' })
  .format(value)
