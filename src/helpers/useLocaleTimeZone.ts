class useLocaleTimeZone {
  longDate = (date: string) =>
    this.convertUTCToLocale(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  shortDate = (date: string) => this.convertUTCToLocale(date).toLocaleString();

  private convertUTCToLocale(utc: string) {
    const utcDate = new Date(utc);
    const localeOffset = utcDate.getTimezoneOffset() * 60 * 1000;
    return new Date(utcDate.getTime() - localeOffset);
  }
}

export const UseLocaleTimeZone = new useLocaleTimeZone();
