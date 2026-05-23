import type { Schema, Struct } from '@strapi/strapi';

export interface TracabiliteEtape extends Struct.ComponentSchema {
  collectionName: 'components_tracabilite_etapes';
  info: {
    description: '';
    displayName: '\u00C9tape';
    icon: 'list';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icone: Schema.Attribute.String;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'tracabilite.etape': TracabiliteEtape;
    }
  }
}
