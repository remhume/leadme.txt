// @flow
import { compact, flattenDeep, isEmpty } from 'lodash';
import { List } from 'immutable';
import classnames from 'classnames';
import cxs from 'cxs/monolithic';
import Prefixer from 'inline-style-prefixer';
import React from 'react';
import warning from 'warning';

const prefixer = new Prefixer();
const __DEV__ = true;

export const prefixStyles = (styles: Object) => prefixer.prefix(styles);

export const transformProps = (
  {
    css,
    className,
    ...rest
  }: {
    css?: Object | Object[],
    className?: string,
    rest?: any,
  } = {},
) => {
  if (!css) {
    return {
      className,
      ...rest,
    };
  }

  let combinedCss;
  if (Array.isArray(css)) {
    const compactCss = compact(css);
    if (isEmpty(compactCss)) {
      return {
        className,
        ...rest,
      };
    }
    combinedCss = Object.assign({}, ...flattenDeep(compactCss));
  } else {
    combinedCss = css || {};
  }

  warning(
    !isEmpty(combinedCss),
    `Empty Object provided as style! ${infoFromSourceProp(rest)}`,
  );
  const cx = classnames(cxs(prefixStyles(combinedCss)), className);

  return {
    ...rest,
    className: cx,
  };
};

function infoFromSourceProp(props: ?any) {
  if (props && props.__source) {
    return `check ${props.__source.fileName}:${props.__source.lineNumber}`;
  }
  return '';
}

function warnings(tag: any, props: any, children: any[]) {
  // warning(!props.ref || typeof props.ref !== 'string', `string refs are not supported. Please use functions! ${infoFromSourceProp(props)}`);
  children.forEach(c => {
    warning(
      !List.isList(c),
      `List used as children! ${infoFromSourceProp(props)}`,
    );
  });
}

global.cxsReact = (tag: any, originalProps: any, ...children: any) => {
  if (__DEV__) {
    warnings(tag, originalProps, children);
  }
  let props;
  if (!originalProps || (typeof tag !== 'string' && tag.keepRawCSS)) {
    props = originalProps;
  } else {
    props = transformProps(originalProps);
  }

  if (__DEV__) {
    return React.createElement(tag, props, ...compact(children));
  }
  return React.createElement(tag, props, ...children);
};
