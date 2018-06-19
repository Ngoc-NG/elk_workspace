FROM docker.elastic.co/kibana/kibana-oss:6.2.4

#USER root

#RUN yum install -y iproute net-tools fontconfig freetype

USER kibana

#RUN kibana-plugin install https://github.com/sirensolutions/sentinl/releases/download/tag-6.2.3-3/sentinl-v6.2.4.zip
COPY --chown=kibana:kibana config/sentinl-v6.2.4.zip /usr/share/kibana

RUN kibana-plugin install file:///usr/share/kibana/sentinl-v6.2.4.zip

#COPY --chown=kibana:kibana config/kibana.yml /usr/share/kibana/config/

CMD ["/usr/share/kibana/bin/kibana"]
